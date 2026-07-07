import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SubscribeForm } from "@/components/subscribe-form";
import { posts } from "@/lib/posts";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Index() {
  const [feature, ...rest] = posts;

  return (
    <>
      <SiteHeader />

      {/* Masthead */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground animate-rise" style={{ animationDelay: "0ms" }}>
            <div>Vol. 01 · Wednesday, July 1, 2026</div>
            <div>Five essays · No ads · No autoplay</div>
          </div>

          <h1 className="mt-10 max-w-5xl font-display text-[13vw] font-light leading-[0.9] tracking-[-0.04em] text-foreground animate-rise sm:text-[10vw] md:text-[8.5rem]" style={{ animationDelay: "120ms" }}>
            Which framework,
            <br />
            <span className="italic text-ember">for which site?</span>
          </h1>

          <div className="mt-10 grid gap-6 md:grid-cols-[2fr_1fr] md:gap-16">
            <p className="max-w-2xl text-lg leading-relaxed text-foreground/85 animate-rise" style={{ animationDelay: "240ms" }}>
              A working journal about the tools we build the web with. We compare
              Next.js, Astro, SvelteKit, Remix, and TanStack Start — not by benchmark
              hero shots, but by <em className="font-display italic">the kind of site you're actually shipping</em>.
              Marketing pages don't want what dashboards want. Blogs don't want what
              ecommerce wants. We take positions.
            </p>
            <div className="animate-rise" style={{ animationDelay: "360ms" }}>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                In this volume
              </div>
              <ul className="mt-3 space-y-1.5 text-sm">
                {posts.map((p) => (
                  <li key={p.slug} className="flex gap-3">
                    <span className="font-mono text-ember">{p.issue}</span>
                    <a href={`#${p.slug}`} className="ink-link">{p.siteType}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Decorative underline SVG */}
        <svg
          className="pointer-events-none absolute -bottom-2 left-0 h-8 w-full text-ember/40"
          viewBox="0 0 1200 32"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 20 Q 200 4 400 18 T 800 16 T 1200 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="1600"
            style={{ ["--dash" as string]: "1600" } as React.CSSProperties}
            className="animate-draw"
          />
        </svg>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden border-b border-border/60 py-3">
        <div className="flex whitespace-nowrap animate-marquee font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-8 pr-8">
              <span>★ Astro is having a moment</span>
              <span>·</span>
              <span>Server components ≠ SSR</span>
              <span>·</span>
              <span>TanStack Start is out of beta</span>
              <span>·</span>
              <span>Remix and React Router merged, kind of</span>
              <span>·</span>
              <span>Qwik resumability is still cool</span>
              <span>·</span>
              <span>Your framework isn't the bottleneck</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* Feature */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="mb-8 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <span>The lead</span>
            <span>{feature.issue}</span>
          </div>
          <Link to="/posts/$slug" params={{ slug: feature.slug }} className="group block">
            <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ember">
                  {feature.siteType}
                </div>
                <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight transition-colors duration-500 group-hover:text-ember md:text-6xl">
                  {feature.title}
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">
                  {feature.dek}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  <span>{feature.date}</span>
                  <span className="text-ember">·</span>
                  <span>{feature.readTime} min read</span>
                  <span className="text-ember">·</span>
                  <span className="ink-link text-foreground">Read essay →</span>
                </div>
              </div>
              <aside className="border-l border-border/60 pl-8 md:pl-10">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  The verdict
                </div>
                <p className="mt-4 font-display text-2xl italic leading-snug text-foreground">
                  "{feature.verdict}"
                </p>
                <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Contenders
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {feature.frameworks.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-border bg-card px-3 py-1 font-mono text-xs"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </aside>
            </div>
          </Link>
        </div>
      </section>

      {/* Archive */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>The archive</span>
          <span>{rest.length} essays</span>
        </div>
        <ul className="divide-y divide-border/60">
          {rest.map((p, i) => (
            <li key={p.slug} id={p.slug}>
              <Link
                to="/posts/$slug"
                params={{ slug: p.slug }}
                className="group grid gap-4 py-8 transition-colors md:grid-cols-[80px_1fr_auto] md:items-baseline md:gap-10"
              >
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
                  {p.issue}
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {p.siteType}
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-medium leading-tight tracking-tight transition-all duration-500 group-hover:translate-x-1 group-hover:text-ember md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {p.dek}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground md:flex-col md:items-end md:gap-1">
                  <span>{p.date}</span>
                  <span className="text-ember">{p.readTime} min</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Manifesto card */}
        <div className="mt-24 grid gap-6 rounded-lg border border-border/60 bg-card p-8 md:grid-cols-[auto_1fr] md:gap-10 md:p-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ember md:w-32">
            An aside
          </div>
          <div>
            <p className="font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl">
              Frameworks are a means, not a personality. The best web engineer on your
              team is the one who <em className="italic text-ember">stops mid-argument to ask what you're building</em>.
            </p>
            <div className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              — The editors
            </div>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section id="subscribe" className="border-t border-border/60">
        <div className="mx-auto max-w-4xl px-6 py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ember">
                The dispatch
              </div>
              <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
                A quiet email,
                <br />
                <span className="italic text-ember">every other Wednesday.</span>
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-base leading-relaxed text-foreground/80">
                One essay, delivered directly. No promotions, no tracking pixels, no
                "our new AI features" — just the piece, the verdict, and a note from
                the editors.
              </p>
              <div className="mt-8">
                <SubscribeForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
