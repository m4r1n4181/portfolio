// Deljeno između servera i browsera: imena "prikaznih" alata i oblik njihovog izlaza.
// Alati ne vraćaju tekst nego samo šta treba prikazati (npr. koje projekte);
// browser onda nacrta karticu iz src/data, pa podaci postoje na jednom mestu.

export type ShowProjectsOutput = { slugs: string[] };
export type ShowProjectOutput = { slug: string };
export type EmptyOutput = Record<string, never>;

export const displayTools = [
  "showProjects",
  "showProject",
  "showSkills",
  "showContact",
  "showAbout",
  "showFun",
] as const;
export type DisplayTool = (typeof displayTools)[number];
