import { siteConfig } from "./site-config";

/**
 * Thin fetch wrapper for the Python backend.
 * Expected endpoints (implement server-side):
 *   POST {apiBase}/subscribe   { email }          → { ok: true }
 *   POST {apiBase}/contact     { name, email, message } → { ok: true }
 *   GET  {apiBase}/posts                          → Post[]  (optional; frontend has seed content)
 */

export async function postJSON<T = unknown>(
  path: string,
  body: unknown,
): Promise<T> {
  if (!siteConfig.apiBase) {
    throw new Error(
      "Backend not configured yet. Set VITE_API_BASE to your Python API URL.",
    );
  }
  const res = await fetch(`${siteConfig.apiBase}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed (${res.status})`);
  }
  return res.json();
}
