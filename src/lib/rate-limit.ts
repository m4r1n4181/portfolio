import "server-only";

// Jednostavan "sliding window" rate limit u memoriji servera:
// pamtimo vremena poslednjih zahteva po IP adresi i odbijamo kad ih je previše.
// Ograničenje: na Vercelu svaka instanca ima svoju memoriju, pa je ovo zaštita
// od slučajnog spama, ne od napada. Za jače: Upstash Redis (@upstash/ratelimit).
const WINDOW_MS = 10 * 60 * 1000; // 10 minuta
const MAX_REQUESTS = 20;
const hits = new Map<string, number[]>();

export function rateLimit(key: string): { ok: boolean } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return { ok: false };
  }
  recent.push(now);
  hits.set(key, recent);
  // Da mapa ne raste beskonačno.
  if (hits.size > 5000) hits.clear();
  return { ok: true };
}
