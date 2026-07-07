import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-16 md:pt-24">
        <header className="animate-rise">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ember">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[1.02] tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Last updated · {updated}
          </p>
        </header>
        <div
          className="prose-editorial mt-14 animate-rise"
          style={{ animationDelay: "150ms" }}
        >
          {children}
        </div>
      </article>
      <SiteFooter />
    </>
  );
}
