"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

// Vrednost (npr. demo e-mail ili lozinka) sa dugmetom za kopiranje.
export function CopyValue({ value, label, done }: { value: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <span className="inline-flex items-center gap-1">
      <code className="font-mono text-[13px]">{value}</code>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {
            // Clipboard nije dostupan (npr. http bez https): korisnik može ručno da označi tekst.
          }
        }}
        aria-label={`${label}: ${value}`}
        title={copied ? done : label}
        className="grid size-9 place-items-center rounded-md text-muted hover:bg-ink/5 hover:text-ink"
      >
        {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
      </button>
    </span>
  );
}
