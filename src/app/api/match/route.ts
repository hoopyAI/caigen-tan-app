import { NextRequest, NextResponse } from "next/server";
import { AzureOpenAI } from "openai";
import { getQuotesFormatted, getQuoteById } from "@/lib/quotes";

const openai = new AzureOpenAI({
  endpoint: process.env.AZURE_OPENAI_ENDPOINT,
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  apiVersion: "2024-10-21",
});

// Simple in-memory rate limiter: max 10 requests per minute per IP
const rateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimit.get(ip)?.filter((t) => now - t < RATE_LIMIT_WINDOW) || [];
  if (timestamps.length >= RATE_LIMIT_MAX) return true;
  timestamps.push(now);
  rateLimit.set(ip, timestamps);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "请求太频繁，请稍后再试" },
        { status: 429 }
      );
    }

    const { mood } = await request.json();

    if (!mood || typeof mood !== "string" || mood.trim().length === 0) {
      return NextResponse.json(
        { error: "请输入你的心情" },
        { status: 400 }
      );
    }

    // Limit input length to prevent excessive API costs
    if (mood.length > 500) {
      return NextResponse.json(
        { error: "输入内容过长" },
        { status: 400 }
      );
    }

    const quotesContext = getQuotesFormatted();

    const completion = await openai.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "gpt-4o-mini",
      temperature: 0.9,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `你是一位温暖而智慧的长者，深谙菜根谭的哲理。用户会描述自己当前的心情或处境，你需要从以下菜根谭语录中选出最合适的一句。

核心原则：你的目标是宽慰和启发用户，而不是简单地"匹配"情绪。
- 如果用户感到沮丧、焦虑或痛苦，选择能给予力量、开解和希望的语录，而不是描述痛苦本身的语录
- 如果用户开心或积极，选择能锦上添花、引发更深思考的语录
- 想象你是在对一个朋友说"我觉得这句话现在对你最有帮助"

选择策略：
- 针对用户的具体情境选择最贴切的语录，好的选择应当让用户感到"这句话就是说给我听的"
- 不要选择把"苦难""逆境""失败"等词简单排比的语录（如"苦难是…，逆境是…，失败是…"），这类语录对什么情绪都泛泛适用，缺乏针对性
- 菜根谭有 360 条语录，涵盖修身、处世、待人、应事、闲适、自然等丰富主题，请深入阅读后选出与用户处境最具体相关的那一条
- 举例：用户说"工作累"→ 找谈忙闲、张弛的语录；用户说"吵架"→ 找谈宽容、退让的语录；用户说"孤独"→ 找谈独处、自得的语录

要求：
1. 理解用户情绪的深层含义，不要只做表面关键词匹配
2. 优先选择能宽慰、激励、开解用户的语录，避免选择可能让用户更难受的内容
3. 只返回一个 JSON 对象，格式为 {"id": <数字>}
4. 不要返回任何其他内容

语录列表：
${quotesContext}`,
        },
        {
          role: "user",
          content: mood,
        },
      ],
    });

    const rawContent = completion.choices[0]?.message?.content?.trim();
    if (!rawContent) {
      return NextResponse.json(
        { error: "AI 未返回结果" },
        { status: 500 }
      );
    }

    // Strip markdown code fences if present
    const content = rawContent.replace(/^```(?:json)?\s*|\s*```$/g, "");
    const parsed = JSON.parse(content);
    const quote = getQuoteById(parsed.id);

    if (!quote) {
      return NextResponse.json(
        { error: "未找到匹配的语录" },
        { status: 500 }
      );
    }

    return NextResponse.json({ quote });
  } catch (error) {
    console.error("Match API error:", error);
    return NextResponse.json(
      { error: "匹配失败，请稍后再试" },
      { status: 500 }
    );
  }
}
