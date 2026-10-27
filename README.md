# Marina · AI portfolio

An AI-native portfolio (EN / SR): visitors ask questions and an assistant answers from my projects, showing project cards, case studies, skills and contact inline. Every case study also has its own static page for search engines and for people who'd rather read.

Built with Next.js, TypeScript, Tailwind and the Vercel AI SDK. The model is any OpenAI-compatible API: Qwen on Alibaba Cloud in production, Qwen via Ollama locally.

## Run locally

```bash
npm install
cp .env.example .env.local   # set LLM_BASE_URL, LLM_API_KEY, LLM_MODEL (or CHAT_MOCK=1)
npm run dev                  # http://localhost:3000 → /en
```

## How it works

- **Quick questions** (Me, Projects, Skills, Fun, Contact) answer instantly on the client, without calling the model. They are added to the conversation in the same format as real tool calls, so the model sees what was already shown.
- **Free-text questions** go to `/api/chat`. The model gets the whole portfolio as instructions (it's a few thousand tokens, so no RAG needed) and **display tools** (`showProjects`, `showProject`, `showSkills`, `showContact`, `showAbout`, `showFun`). A tool returns only *what* to show; the browser renders it from `src/data`, so content lives in one place.
- **Guardrails:** answers only from the portfolio, refuses to invent facts, 600-character questions, last 12 messages, 600 output tokens, 20 requests per IP per 10 minutes (in memory, per instance).

## Where things live

| What | File |
|---|---|
| About me, skills, contact, hobbies | `src/data/profile.ts` |
| Projects, case studies, images and videos | `src/data/projects.ts`, `public/projects/` |
| Interface text in both languages | `src/i18n/dictionaries.ts` |
| Assistant instructions and tools | `src/lib/assistant.ts` |
| Chat API | `src/app/api/chat/route.ts` |
| Model selection (Qwen / Ollama / mock) | `src/lib/llm.ts` |
| Chat UI | `src/components/chat/` |

## Before publishing

Search the code for `TODO`: LinkedIn, e-mail and CV in `profile.ts`, a sentence about hobbies, the Azure demo link for Endokrina. Set `LLM_BASE_URL`, `LLM_API_KEY`, `LLM_MODEL` and `NEXT_PUBLIC_SITE_URL` on Vercel, and set a spending limit in the Alibaba Cloud console.
