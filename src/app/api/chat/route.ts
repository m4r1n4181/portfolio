import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai";
import { isLang } from "@/i18n/config";
import { instructions, tools } from "@/lib/assistant";
import { rateLimit } from "@/lib/rate-limit";
import { getModel, isLlmConfigured } from "@/lib/llm";

const MAX_MESSAGES = 12; // koliko poslednjih poruka šaljemo modelu (kontrola troška)
const MAX_CHARS = 600; // najduže pitanje koje prihvatamo

export async function POST(req: Request) {
  // Model i ključ se biraju u .env.local (vidi src/lib/llm.ts).
  if (!isLlmConfigured() && process.env.CHAT_MOCK !== "1") {
    return Response.json({ error: "offline" }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (!rateLimit(ip).ok) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { messages?: UIMessage[]; lang?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }
  const lang = body.lang && isLang(body.lang) ? body.lang : "en";
  const messages = (body.messages ?? []).slice(-MAX_MESSAGES);

  const last = messages.at(-1);
  const lastText = last?.parts.map((p) => (p.type === "text" ? p.text : "")).join("") ?? "";
  if (!last || last.role !== "user" || lastText.length === 0 || lastText.length > MAX_CHARS) {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const result = streamText({
    model: await getModel(),
    instructions: instructions(lang),
    messages: await convertToModelMessages(messages, { tools }),
    tools,
    stopWhen: isStepCount(3), // alat + odgovor posle alata
    maxOutputTokens: 600,
    temperature: 0.3,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
