import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the OpenAI module before importing the route
const { mockCreate } = vi.hoisted(() => {
  const mockCreate = vi.fn();
  return { mockCreate };
});
vi.mock("openai", () => {
  return {
    AzureOpenAI: class {
      chat = {
        completions: {
          create: mockCreate,
        },
      };
    },
  };
});

// We need to test the route handler's logic. Import after mocking.
import { POST } from "@/app/api/match/route";
import { NextRequest } from "next/server";

function getOpenAIMock() {
  return mockCreate;
}

function makeRequest(body: unknown, ip = "127.0.0.1"): NextRequest {
  return new NextRequest("http://localhost:3000/api/match", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

describe("第二层：API Route 输入验证", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("空 mood 返回 400", async () => {
    const res = await POST(makeRequest({ mood: "" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("请输入你的心情");
  });

  it("缺少 mood 字段返回 400", async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it("mood 不是字符串返回 400", async () => {
    const res = await POST(makeRequest({ mood: 123 }));
    expect(res.status).toBe(400);
  });

  it("mood 超过 500 字符返回 400", async () => {
    const longMood = "啊".repeat(501);
    const res = await POST(makeRequest({ mood: longMood }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBe("输入内容过长");
  });

  it("mood 刚好 500 字符应该通过验证（到达 AI 调用）", async () => {
    const mockCreate = getOpenAIMock();
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: '{"id": 1}' } }],
    });

    const mood = "啊".repeat(500);
    const res = await POST(makeRequest({ mood }));
    expect(res.status).toBe(200);
    expect(mockCreate).toHaveBeenCalledOnce();
  });

  it("AI 返回无效 ID 时返回 500", async () => {
    const mockCreate = getOpenAIMock();
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: '{"id": 9999}' } }],
    });

    const res = await POST(makeRequest({ mood: "开心" }));
    expect(res.status).toBe(500);
    const data = await res.json();
    expect(data.error).toBe("未找到匹配的语录");
  });

  it("AI 返回 markdown fence 包裹的 JSON 也能解析", async () => {
    const mockCreate = getOpenAIMock();
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: '```json\n{"id": 42}\n```' } }],
    });

    const res = await POST(makeRequest({ mood: "平静" }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.quote.id).toBe(42);
  });

  it("AI 返回空内容时返回 500", async () => {
    const mockCreate = getOpenAIMock();
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: "" } }],
    });

    const res = await POST(makeRequest({ mood: "难过" }));
    expect(res.status).toBe(500);
  });

  it("Rate limit: 第 11 次请求应被拒绝", async () => {
    const mockCreate = getOpenAIMock();
    // 让前 10 次都成功
    for (let i = 0; i < 10; i++) {
      mockCreate.mockResolvedValueOnce({
        choices: [{ message: { content: '{"id": 1}' } }],
      });
    }

    const testIp = `rate-limit-test-${Date.now()}`;
    for (let i = 0; i < 10; i++) {
      const res = await POST(makeRequest({ mood: "测试" }, testIp));
      expect(res.status).toBe(200);
    }

    // 第 11 次应该 429
    const res = await POST(makeRequest({ mood: "测试" }, testIp));
    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.error).toContain("请求太频繁");
  });
});
