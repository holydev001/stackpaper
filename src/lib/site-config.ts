/**
 * Central site configuration. This file is the "CMS" seam for the frontend.
 * A Python backend (or admin panel) can:
 *   1. Overwrite this file at build time, OR
 *   2. Serve JSON at `${API_BASE}/config` — see `src/lib/api.ts`.
 *
 * Keep values here JSON-serializable so a backend can round-trip them.
 */

export type ThemeColors = {
  /** Page background (warm paper) */
  paper: string;
  paperDeep: string;
  /** Primary text */
  ink: string;
  /** Accent — buttons, underlines, verdict cards */
  ember: string;
  emberSoft: string;
  rule: string;
  mutedForeground: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  contactEmail: string;
  /**
   * Base URL of the Python backend. Set VITE_API_BASE in env to enable
   * live content + subscribe/contact submissions. Empty string = frontend-only
   * (uses seed content from src/lib/posts.ts, forms show a friendly notice).
   */
  apiBase: string;
  socials: { label: string; href: string }[];
  theme: ThemeColors;
};

export const siteConfig: SiteConfig = {
  name: "Stackpaper",
  tagline: "A journal of frameworks",
  description:
    "An opinionated technical journal matching web frameworks to the sites they're actually good at.",
  contactEmail: "hello@stackpaper.dev",
  apiBase: (import.meta.env.VITE_API_BASE as string | undefined) ?? "",
  socials: [
    { label: "RSS", href: "/rss.xml" },
    { label: "Twitter / X", href: "https://x.com/" },
    { label: "GitHub", href: "https://github.com/" },
  ],
  theme: {
    paper: "oklch(0.965 0.012 80)",
    paperDeep: "oklch(0.935 0.018 75)",
    ink: "oklch(0.185 0.015 40)",
    ember: "oklch(0.585 0.155 40)",
    emberSoft: "oklch(0.88 0.045 55)",
    rule: "oklch(0.82 0.02 60)",
    mutedForeground: "oklch(0.45 0.02 50)",
  },
};
