import { describe, it, expect } from "vitest";
import {
  getAllQuotes,
  getRandomQuote,
  getQuoteById,
  getQuotesFormatted,
} from "@/lib/quotes";

describe("第一层：纯函数单元测试", () => {
  describe("getAllQuotes", () => {
    it("应返回 360 条语录", () => {
      const quotes = getAllQuotes();
      expect(quotes).toHaveLength(360);
    });

    it("每条语录都有完整字段", () => {
      const quotes = getAllQuotes();
      for (const q of quotes) {
        expect(q.id).toBeTypeOf("number");
        expect(q.collection).toMatch(/^(前集|后集)$/);
        expect(q.original).toBeTypeOf("string");
        expect(q.original.length).toBeGreaterThan(0);
        expect(q.interpretation).toBeTypeOf("string");
        expect(q.interpretation.length).toBeGreaterThan(0);
        expect(q.source).toMatch(/^菜根谭·(前集|后集)·第\d+则$/);
      }
    });

    it("ID 范围应为 1-360 且无重复", () => {
      const quotes = getAllQuotes();
      const ids = quotes.map((q) => q.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(360);
      expect(Math.min(...ids)).toBe(1);
      expect(Math.max(...ids)).toBe(360);
    });
  });

  describe("getQuoteById", () => {
    it("有效 ID 返回正确 quote", () => {
      const quote = getQuoteById(1);
      expect(quote).toBeDefined();
      expect(quote!.id).toBe(1);
    });

    it("ID=220 返回苦难那句", () => {
      const quote = getQuoteById(220);
      expect(quote).toBeDefined();
      expect(quote!.original).toContain("苦难是人生之师");
    });

    it("无效 ID 返回 undefined", () => {
      expect(getQuoteById(0)).toBeUndefined();
      expect(getQuoteById(361)).toBeUndefined();
      expect(getQuoteById(-1)).toBeUndefined();
    });
  });

  describe("getRandomQuote", () => {
    it("返回有效 quote 对象", () => {
      const quote = getRandomQuote();
      expect(quote.id).toBeGreaterThanOrEqual(1);
      expect(quote.id).toBeLessThanOrEqual(360);
      expect(quote.original).toBeTypeOf("string");
    });

    it("多次调用不全是同一条（概率极低会失败）", () => {
      const ids = new Set<number>();
      for (let i = 0; i < 20; i++) {
        ids.add(getRandomQuote().id);
      }
      expect(ids.size).toBeGreaterThan(1);
    });
  });

  describe("getQuotesFormatted", () => {
    it("格式为 [ID:X] 文本，共 360 行", () => {
      const formatted = getQuotesFormatted();
      const lines = formatted.split("\n");
      expect(lines).toHaveLength(360);
    });

    it("每行格式正确", () => {
      const formatted = getQuotesFormatted();
      const lines = formatted.split("\n");
      for (const line of lines) {
        expect(line).toMatch(/^\[ID:\d+\] .+/);
      }
    });

    it("包含所有 360 个 ID（顺序已随机化）", () => {
      const formatted = getQuotesFormatted();
      const ids = [...formatted.matchAll(/\[ID:(\d+)\]/g)].map((m) =>
        Number(m[1])
      );
      const sorted = [...ids].sort((a, b) => a - b);
      expect(sorted[0]).toBe(1);
      expect(sorted[sorted.length - 1]).toBe(360);
      expect(new Set(ids).size).toBe(360);
    });
  });
});
