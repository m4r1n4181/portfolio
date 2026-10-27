import type { Lang } from "./config";

// Fiksni tekst interfejsa. Sadržaj o tebi i projektima je u src/data/.
// Teme brzih pitanja: svaka ima oznaku na dugmetu i pitanje koje se "pošalje" u chat.
export type Topic = "me" | "projects" | "skills" | "fun" | "contact";

const en = {
  meta: { chatTitle: "Ask me anything" },
  landing: {
    greeting: "Hey, I'm Marina",
    intro: "Ask about my projects, how I evaluate models, or what I'm looking for. The assistant answers from my portfolio.",
    browse: "Or read the case studies",
  },
  topics: {
    me: { label: "Me", question: "Who are you?" },
    projects: { label: "Projects", question: "What have you built?" },
    skills: { label: "Skills", question: "What's your stack?" },
    fun: { label: "Fun", question: "What do you do outside of work?" },
    contact: { label: "Contact", question: "How can I reach you?" },
  } satisfies Record<Topic, { label: string; question: string }>,
  // Kratki uvodi za brza pitanja (prikazuju se odmah, bez poziva AI-ja).
  topicIntros: {
    me: "",
    projects: "Here's what I've built. Open any card for the full case study: the problem, what I did, the numbers and what didn't work.",
    skills: "These are the tools I've used in real projects, not just tutorials.",
    fun: "",
    contact: "",
  } satisfies Record<Topic, string>,
  composer: {
    placeholder: "Ask me anything…",
    label: "Your question",
    send: "Send",
    stop: "Stop",
    hideQuick: "Hide quick questions",
    showQuick: "Show quick questions",
  },
  chat: {
    thinking: "Thinking",
    error: "The assistant couldn't answer just now.",
    retry: "Try again",
    rateLimited: "That's a lot of questions in a short time. Please wait a few minutes, or browse the case studies in the meantime.",
    offline: "The AI assistant isn't connected yet. The quick questions below still work.",
    infoTitle: "About this chat",
    infoBody:
      "An AI assistant answers on my behalf, using only what's on this site: my projects, skills and background. It can be wrong; the case studies and code are the source of truth. Conversations aren't stored.",
    close: "Close",
    newChat: "New chat",
    you: "You",
  },
  panels: {
    projects: "My projects",
    skills: "Skills",
    contact: "Contact",
    about: "About me",
    fun: "Outside of work",
    lookingFor: "Looking for",
  },
  project: {
    open: "Open case study",
    page: "Full page",
    problem: "The problem",
    approach: "What I did",
    results: "Results",
    learned: "What didn't work & what I learned",
    limitations: "Limitations",
    stack: "Stack",
    links: "Links",
    media: "Screens & demos",
    code: "Code on GitHub",
    demo: "Live demo",
    video: "Demo video",
    back: "All projects",
    prev: "Previous projects",
    next: "Next projects",
    noMedia: "Screenshots coming soon.",
  },
  contact: {
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "E-mail",
    cv: "Download CV",
    more: "LinkedIn and e-mail coming soon.",
  },
  footer: "Built with Next.js and the Vercel AI SDK",
};

// `typeof en` garantuje da srpski ima iste ključeve: zaboravljen prevod = greška pri buildu.
const sr: typeof en = {
  meta: { chatTitle: "Pitaj me bilo šta" },
  landing: {
    greeting: "Zdravo, ja sam Marina",
    intro: "Pitaj me o projektima, kako ocenjujem modele ili šta tražim. Asistent odgovara iz mog portfolija.",
    browse: "Ili pročitaj studije slučaja",
  },
  topics: {
    me: { label: "O meni", question: "Ko si ti?" },
    projects: { label: "Projekti", question: "Šta si napravila?" },
    skills: { label: "Veštine", question: "Sa čim radiš?" },
    fun: { label: "Zabava", question: "Šta radiš van posla?" },
    contact: { label: "Kontakt", question: "Kako da te kontaktiram?" },
  },
  topicIntros: {
    me: "",
    projects: "Evo šta sam napravila. Otvori bilo koju karticu za celu studiju slučaja: problem, šta sam uradila, brojke i šta nije uspelo.",
    skills: "Ovo su alati koje sam koristila u stvarnim projektima, ne samo u tutorijalima.",
    fun: "",
    contact: "",
  },
  composer: {
    placeholder: "Pitaj me bilo šta…",
    label: "Tvoje pitanje",
    send: "Pošalji",
    stop: "Zaustavi",
    hideQuick: "Sakrij brza pitanja",
    showQuick: "Prikaži brza pitanja",
  },
  chat: {
    thinking: "Razmišljam",
    error: "Asistent trenutno ne može da odgovori.",
    retry: "Pokušaj ponovo",
    rateLimited: "Mnogo pitanja za kratko vreme. Sačekaj par minuta, a u međuvremenu pogledaj studije slučaja.",
    offline: "AI asistent još nije povezan. Brza pitanja ispod i dalje rade.",
    infoTitle: "O ovom chatu",
    infoBody:
      "AI asistent odgovara u moje ime, koristeći samo ono što je na ovom sajtu: projekte, veštine i moje iskustvo. Može da pogreši; studije slučaja i kod su pravi izvor. Razgovori se ne čuvaju.",
    close: "Zatvori",
    newChat: "Novi razgovor",
    you: "Ti",
  },
  panels: {
    projects: "Moji projekti",
    skills: "Veštine",
    contact: "Kontakt",
    about: "O meni",
    fun: "Van posla",
    lookingFor: "Tražim",
  },
  project: {
    open: "Otvori studiju slučaja",
    page: "Cela stranica",
    problem: "Problem",
    approach: "Šta sam uradila",
    results: "Rezultati",
    learned: "Šta nije uspelo i šta sam naučila",
    limitations: "Ograničenja",
    stack: "Tehnologije",
    links: "Linkovi",
    media: "Ekrani i demo snimci",
    code: "Kod na GitHubu",
    demo: "Live demo",
    video: "Demo video",
    back: "Svi projekti",
    prev: "Prethodni projekti",
    next: "Sledeći projekti",
    noMedia: "Snimci ekrana uskoro.",
  },
  contact: {
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "E-mail",
    cv: "Preuzmi CV",
    more: "LinkedIn i e-mail uskoro.",
  },
  footer: "Napravljeno u Next.js-u i Vercel AI SDK-u",
};

const dictionaries = { en, sr };
export type Dictionary = typeof en;
export const getDictionary = (lang: Lang): Dictionary => dictionaries[lang];
