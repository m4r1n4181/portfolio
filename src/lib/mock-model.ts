import "server-only";
import { MockLanguageModelV4, convertArrayToReadableStream } from "ai/test";
import type { LanguageModelV4StreamPart } from "@ai-sdk/provider";

// Lažni model za lokalno testiranje chata bez API ključa (CHAT_MOCK=1 u .env.local).
// Prvi korak "pozove" alat showProject, drugi korak napiše kratak tekst.
// Ne koristi se u produkciji: route.ts ga uvozi samo kad je CHAT_MOCK=1.
const usage = {
  inputTokens: { total: 10, noCache: 10, cacheRead: 0, cacheWrite: 0 },
  outputTokens: { total: 10, text: 10, reasoning: 0 },
};

export function mockModel() {
  return new MockLanguageModelV4({
    doStream: async (options) => {
      const hasToolResult = options.prompt.some((m) => m.role === "tool");
      const step2 = hasToolResult && options.prompt.at(-1)?.role === "tool";
      const chunks: LanguageModelV4StreamPart[] = step2
        ? [
            { type: "text-start" as const, id: "t1" },
            {
              type: "text-delta" as const,
              id: "t1",
              delta:
                "The hardest part wasn't the model, it was **candidate search**: the scraper stopped at 43 of 60 pages, so 16 customers were simply missing. After fixing it, the right customer is in the top 5 in 162 of 167 cases.",
            },
            { type: "text-end" as const, id: "t1" },
            { type: "finish" as const, usage, finishReason: { unified: "stop" as const, raw: undefined } },
          ]
        : [
            {
              type: "tool-call" as const,
              toolCallId: `call_${Date.now()}`,
              toolName: "showProject",
              input: JSON.stringify({ slug: "web-automation" }),
            },
            { type: "finish" as const, usage, finishReason: { unified: "tool-calls" as const, raw: undefined } },
          ];
      return { stream: convertArrayToReadableStream(chunks) };
    },
  });
}
