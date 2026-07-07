import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-32 border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ember">
              Colophon
            </div>
            <p className="mt-4 max-w-md font-display text-2xl font-medium leading-snug tracking-tight">
              {siteConfig.name} is a small journal that argues, gently, that most
              framework debates would end faster if we asked what the site was for.
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="ink-link mt-6 inline-block font-mono text-xs uppercase tracking-widest text-ember"
            >
              {siteConfig.contactEmail}
            </a>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              The journal
            </div>
            <ul className="mt-4 space-y-2 font-mono text-xs uppercase tracking-widest">
              <li><Link to="/" className="ink-link">Index</Link></li>
              <li><Link to="/about" className="ink-link">About</Link></li>
              <li><Link to="/contact" className="ink-link">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Legal
            </div>
            <ul className="mt-4 space-y-2 font-mono text-xs uppercase tracking-widest">
              <li><Link to="/privacy" className="ink-link">Privacy policy</Link></li>
              <li><Link to="/terms" className="ink-link">Terms & conditions</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Elsewhere
            </div>
            <ul className="mt-4 space-y-2 font-mono text-xs uppercase tracking-widest">
              {siteConfig.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="ink-link" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <div>© 2026 {siteConfig.name} Editions</div>
          <div>Printed on the open web</div>
        </div>
      </div>
    </footer>
  );
}
