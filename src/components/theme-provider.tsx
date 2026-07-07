import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";

/**
 * Applies theme colors from `siteConfig.theme` to CSS variables at runtime.
 * Lets an admin panel change palette without recompiling.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const t = siteConfig.theme;
    root.style.setProperty("--paper", t.paper);
    root.style.setProperty("--paper-deep", t.paperDeep);
    root.style.setProperty("--ink", t.ink);
    root.style.setProperty("--ember", t.ember);
    root.style.setProperty("--ember-soft", t.emberSoft);
    root.style.setProperty("--rule", t.rule);
    root.style.setProperty("--muted-foreground", t.mutedForeground);
  }, []);
  return <>{children}</>;
}
