import type { Localized } from "@/i18n/config";

// Sve o tebi na jednom mestu. Kartice "Me", "Skills", "Fun" i "Contact"
// i AI asistent čitaju odavde. Ako nešto nije ovde, AI to ne zna i neće izmišljati.
export const profile = {
  name: "Marina",
  role: { en: "AI / ML Engineer", sr: "AI / ML inženjerka" } satisfies Localized,
  location: { en: "Serbia · open to remote", sr: "Srbija · otvorena za remote" } satisfies Localized,
  about: [
    {
      en: "I'm finishing a degree in data science and work as a freelance developer and SEO consultant, so I'm used to scoping projects with clients and shipping things people actually use.",
      sr: "Završavam studije nauke o podacima i radim kao frilens developerka i SEO konsultantkinja, pa sam navikla da sa klijentima dogovaram obim posla i isporučujem stvari koje ljudi zaista koriste.",
    },
    {
      en: "What I care about most is machine learning and AI engineering done properly: a clear problem, an honest evaluation that includes what didn't work, and a system that runs outside a notebook.",
      sr: "Najviše me zanimaju mašinsko učenje i AI inženjering urađeni kako treba: jasan problem, poštena evaluacija koja uključuje i ono što nije uspelo, i sistem koji radi i van notebooka.",
    },
  ] satisfies Localized[],
  lookingFor: {
    en: "A role in ML / AI engineering. I also take on automation projects.",
    sr: "Posao u ML / AI inženjeringu. Prihvatam i projekte automatizacije.",
  } satisfies Localized,
  fun: [
    { en: "Reading", sr: "Čitanje" },
    { en: "Crocheting", sr: "Heklanje" },
    { en: "Cooking", sr: "Kuvanje" },
  ] satisfies Localized[],
  funNote: {
    // TODO: dopiši rečenicu-dve svojim rečima (omiljena knjiga, šta trenutno heklaš...)
    en: "Outside of work I read, crochet and cook.",
    sr: "Van posla čitam, heklam i kuvam.",
  } satisfies Localized,
  links: {
    github: "https://github.com/m4r1n4181",
    linkedin: "", // TODO: LinkedIn URL (prazno = ne prikazuje se)
    email: "marinakhan1801@gmail.com", // TODO: e-mail (prazno = ne prikazuje se)
    cv: "", // TODO: npr. "/marina-cv.pdf" u folderu public/
  },
};

export const skills: { group: Localized; items: string[] }[] = [
  {
    group: { en: "Machine learning", sr: "Mašinsko učenje" },
    items: ["PyTorch", "scikit-learn", "LightGBM", "XGBoost", "Recommender systems", "Ranking & retrieval metrics", "MLflow"],
  },
  {
    group: { en: "LLMs & AI engineering", sr: "LLM i AI inženjering" },
    items: ["RAG", "Embeddings & vector search", "LLM-as-judge evaluation", "Guardrails", "Tool calling", "Claude API"],
  },
  {
    group: { en: "Automation & data", sr: "Automatizacija i podaci" },
    items: ["Selenium", "PDF extraction", "Fuzzy matching", "pandas", "SQLite", "PostgreSQL"],
  },
  {
    group: { en: "Backend & delivery", sr: "Backend i isporuka" },
    items: ["Python", "FastAPI", "ASP.NET Core", "Node.js / Express", "React", "TypeScript", "Docker", "GitHub Actions", "Azure"],
  },
];
