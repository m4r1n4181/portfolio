import "server-only";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { simulateStreamingMiddleware, wrapLanguageModel, type LanguageModel } from "ai";

// Bira model na osnovu env promenljivih. Koristimo "OpenAI-compatible" API:
// mnogi provajderi (Qwen na Alibaba Cloudu, Ollama lokalno, OpenRouter...) primaju
// isti format zahteva kao OpenAI, pa jedan kod radi sa svima. Menjaš samo .env.local.
//
//   LLM_BASE_URL  adresa API-ja (vidi .env.example)
//   LLM_API_KEY   ključ (za lokalni Ollama može bilo šta, npr. "ollama")
//   LLM_MODEL     ime modela, npr. "qwen-plus" ili "qwen2.5:7b"
//   LLM_STREAM    "1" = pravi streaming; podrazumevano isključen (vidi dole)

export function isLlmConfigured() {
  return Boolean(process.env.LLM_BASE_URL && process.env.LLM_MODEL);
}

export async function getModel(): Promise<LanguageModel> {
  if (process.env.CHAT_MOCK === "1") {
    return (await import("./mock-model")).mockModel();
  }

  const provider = createOpenAICompatible({
    name: "llm",
    baseURL: process.env.LLM_BASE_URL!,
    apiKey: process.env.LLM_API_KEY || "none",
  });
  const model = provider.chatModel(process.env.LLM_MODEL!);

  // Alibaba-ina dokumentacija kaže da se alati (tools) ne mogu koristiti zajedno sa
  // stream=true. Zato podrazumevano tražimo ceo odgovor odjednom, a "simulateStreaming"
  // ga pretvori u stream koji chat UI očekuje. Za Ollama i druge koji to podržavaju: LLM_STREAM=1.
  if (process.env.LLM_STREAM === "1") return model;
  return wrapLanguageModel({ model, middleware: simulateStreamingMiddleware() });
}
