import { describe, it, expect } from "vitest";
import { AzureOpenAI } from "openai";
import { getQuotesFormatted, getQuoteById } from "@/lib/quotes";

/*
 * 第三层：AI 匹配质量集成测试
 *
 * 直接调用 Azure OpenAI，复现 route.ts 的 prompt 逻辑，
 * 统计返回 quote 的分布，评估多样性和质量。
 *
 * 需要环境变量：AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY, AZURE_OPENAI_DEPLOYMENT_NAME
 */

const MOODS = [
  { label: "疲惫", mood: "今天工作很累，感觉身心疲惫" },
  { label: "人际冲突", mood: "和朋友吵架了，心里很难受" },
  { label: "积极开心", mood: "最近升职了，非常开心" },
  { label: "迷茫", mood: "感觉人生没有方向，很迷茫" },
  { label: "挫折", mood: "被领导批评了，很沮丧" },
  { label: "平静愉悦", mood: "今天天气很好，心情不错" },
  { label: "焦虑担心", mood: "亲人生病了，很担心" },
  { label: "失败焦虑", mood: "刚考完试，感觉考砸了" },
  { label: "孤独", mood: "一个人在外地过节，有点孤独" },
  { label: "释然", mood: "终于还完了房贷，如释重负" },
] as const;

const CALLS_PER_MOOD = 3;
const TOTAL_CALLS = MOODS.length * CALLS_PER_MOOD;

// Thresholds
const MAX_QUOTE_220_RATIO = 0.15; // quote 220 不超过 15%（30 次采样下 10% 阈值波动过大）
const MAX_SINGLE_QUOTE_COUNT = 5; // 任何单条 quote 最多出现 5 次
const MIN_UNIQUE_QUOTES = 8; // 至少 8 种不同 quote
const MIN_DIVERSE_MOODS = 5; // 至少 5 组心情中有 2+ 不同结果

function buildSystemPrompt(): string {
  const quotesContext = getQuotesFormatted();
  return `你是一位温暖而智慧的长者，深谙菜根谭的哲理。用户会描述自己当前的心情或处境，你需要从以下菜根谭语录中选出最合适的一句。

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
${quotesContext}`;
}

async function matchQuote(
  client: AzureOpenAI,
  mood: string,
  model: string
): Promise<number | null> {
  const completion = await client.chat.completions.create({
    model,
    temperature: 0.9,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: buildSystemPrompt() },
      { role: "user", content: mood },
    ],
  });

  const rawContent = completion.choices[0]?.message?.content?.trim();
  if (!rawContent) return null;

  const content = rawContent.replace(/^```(?:json)?\s*|\s*```$/g, "");
  try {
    const parsed = JSON.parse(content);
    const quote = getQuoteById(parsed.id);
    return quote ? quote.id : null;
  } catch {
    return null;
  }
}

describe("第三层：AI 匹配质量测试", () => {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const model = process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "gpt-4o-mini";

  // Skip if no credentials
  const canRun = endpoint && apiKey;

  it("AI 匹配多样性和质量评估", { skip: !canRun, timeout: 300_000 }, async () => {
      const client = new AzureOpenAI({
        endpoint: endpoint!,
        apiKey: apiKey!,
        apiVersion: "2024-10-21",
      });

      // Collect all results
      type Result = { label: string; mood: string; ids: number[] };
      const results: Result[] = [];

      // Run all mood queries (sequentially to avoid rate limiting)
      for (const { label, mood } of MOODS) {
        const ids: number[] = [];
        for (let i = 0; i < CALLS_PER_MOOD; i++) {
          const id = await matchQuote(client, mood, model);
          if (id !== null) {
            ids.push(id);
          }
        }
        results.push({ label, mood, ids });
      }

      // === 统计分析 ===
      const allIds = results.flatMap((r) => r.ids);
      const totalValid = allIds.length;

      // 各 quote 出现次数
      const frequency = new Map<number, number>();
      for (const id of allIds) {
        frequency.set(id, (frequency.get(id) || 0) + 1);
      }

      // 排序：出现次数从多到少
      const sorted = [...frequency.entries()].sort((a, b) => b[1] - a[1]);

      const quote220Count = frequency.get(220) || 0;
      const quote220Ratio = totalValid > 0 ? quote220Count / totalValid : 0;
      const maxSingleCount = sorted.length > 0 ? sorted[0][1] : 0;
      const maxSingleId = sorted.length > 0 ? sorted[0][0] : -1;
      const uniqueQuotes = frequency.size;

      // 同一心情 3 次调用有不同结果的数量
      let diverseMoods = 0;
      for (const r of results) {
        const unique = new Set(r.ids).size;
        if (unique >= 2) diverseMoods++;
      }

      // === 打印详细报告 ===
      console.log("\n" + "=".repeat(60));
      console.log("  AI 匹配质量报告");
      console.log("=".repeat(60));
      console.log(`总调用次数: ${TOTAL_CALLS}`);
      console.log(`有效返回数: ${totalValid}`);
      console.log(`去重 quote 数: ${uniqueQuotes}`);
      console.log("");

      // 各心情匹配结果
      console.log("--- 各心情匹配结果 ---");
      for (const r of results) {
        const idsStr = r.ids.map((id) => `#${id}`).join(", ");
        const uniqueCount = new Set(r.ids).size;
        const diverseMarker = uniqueCount >= 2 ? "✓ 多样" : "✗ 重复";
        console.log(
          `  ${r.label.padEnd(8)} → ${idsStr.padEnd(30)} [${diverseMarker}]`
        );
      }
      console.log("");

      // Top 10 高频 quote
      console.log("--- Top 10 高频 quote ---");
      for (const [id, count] of sorted.slice(0, 10)) {
        const quote = getQuoteById(id);
        const text = quote
          ? quote.original.substring(0, 30) + "..."
          : "???";
        const bar = "█".repeat(count);
        console.log(`  #${String(id).padStart(3)} (${count}次) ${bar} ${text}`);
      }
      console.log("");

      // 指标评估
      console.log("--- 指标评估 ---");

      const q220Pass = quote220Ratio <= MAX_QUOTE_220_RATIO;
      console.log(
        `  Quote #220 占比: ${quote220Count}/${totalValid} (${(quote220Ratio * 100).toFixed(1)}%) ${q220Pass ? "✅ PASS" : "❌ FAIL"} (阈值 <${MAX_QUOTE_220_RATIO * 100}%)`
      );

      const maxPass = maxSingleCount <= MAX_SINGLE_QUOTE_COUNT;
      console.log(
        `  单条最大出现: #${maxSingleId} 出现 ${maxSingleCount} 次 ${maxPass ? "✅ PASS" : "❌ FAIL"} (阈值 ≤${MAX_SINGLE_QUOTE_COUNT})`
      );

      const uniquePass = uniqueQuotes >= MIN_UNIQUE_QUOTES;
      console.log(
        `  去重 quote 数: ${uniqueQuotes} ${uniquePass ? "✅ PASS" : "❌ FAIL"} (阈值 ≥${MIN_UNIQUE_QUOTES})`
      );

      const diversePass = diverseMoods >= MIN_DIVERSE_MOODS;
      console.log(
        `  多样性心情组: ${diverseMoods}/${MOODS.length} ${diversePass ? "✅ PASS" : "❌ FAIL"} (阈值 ≥${MIN_DIVERSE_MOODS})`
      );

      const allPass = q220Pass && maxPass && uniquePass && diversePass;
      console.log("");
      console.log(
        allPass
          ? "🟢 总评: 全部通过"
          : "🔴 总评: 存在不达标项"
      );
      console.log("=".repeat(60) + "\n");

      // Assertions
      expect(quote220Ratio, `Quote #220 占比 ${(quote220Ratio * 100).toFixed(1)}% 超过阈值 ${MAX_QUOTE_220_RATIO * 100}%`).toBeLessThanOrEqual(MAX_QUOTE_220_RATIO);
      expect(maxSingleCount, `Quote #${maxSingleId} 出现 ${maxSingleCount} 次，超过阈值 ${MAX_SINGLE_QUOTE_COUNT}`).toBeLessThanOrEqual(MAX_SINGLE_QUOTE_COUNT);
      expect(uniqueQuotes, `去重 quote 数 ${uniqueQuotes} 低于阈值 ${MIN_UNIQUE_QUOTES}`).toBeGreaterThanOrEqual(MIN_UNIQUE_QUOTES);
      expect(diverseMoods, `多样性心情组 ${diverseMoods} 低于阈值 ${MIN_DIVERSE_MOODS}`).toBeGreaterThanOrEqual(MIN_DIVERSE_MOODS);
  });
});
