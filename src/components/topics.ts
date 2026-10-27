import { BookOpen, FolderOpen, Layers, Mail, User } from "lucide-react";
import type { Topic } from "@/i18n/dictionaries";
import type { DisplayTool } from "@/lib/chat-tools";

// Redosled dugmića i koja ikonica i koji alat pripadaju kojoj temi.
export const topics: { id: Topic; Icon: typeof User; tool: DisplayTool }[] = [
  { id: "me", Icon: User, tool: "showAbout" },
  { id: "projects", Icon: FolderOpen, tool: "showProjects" },
  { id: "skills", Icon: Layers, tool: "showSkills" },
  { id: "fun", Icon: BookOpen, tool: "showFun" },
  { id: "contact", Icon: Mail, tool: "showContact" },
];

export const isTopic = (v: string | null): v is Topic => topics.some((t) => t.id === v);
