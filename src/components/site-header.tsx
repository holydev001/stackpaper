import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="relative z-10 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
        <Link to="/" className="group flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 28 28" className="text-ember" aria-hidden>
            <rect x="3" y="4" width="22" height="3" fill="currentColor" />
            <rect x="3" y="11" width="16" height="2" fill="currentColor" opacity="0.7" />
            <rect x="3" y="16" width="22" height="2" fill="currentColor" opacity="0.4" />
            <rect x="3" y="21" width="12" height="2" fill="currentColor" opacity="0.25" />
          </svg>
          <div className="leading-tight">
            <div className="font-display text-xl font-medium tracking-tight">Stackpaper</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              A journal of frameworks
            </div>
          </div>
        </Link>
        <nav className="hidden items-center gap-7 font-mono text-xs uppercase tracking-[0.2em] sm:flex">
          <Link to="/" className="ink-link" activeOptions={{ exact: true }}>
            Index
          </Link>
          <Link to="/about" className="ink-link">
            About
          </Link>
          <Link to="/contact" className="ink-link">
            Contact
          </Link>
          <Link to="/#subscribe" className="ink-link text-ember">
            Subscribe
          </Link>
        </nav>
      </div>
    </header>
  );
}
