export type Post = {
  slug: string;
  title: string;
  dek: string;
  verdict: string;
  frameworks: string[];
  siteType: string;
  readTime: number;
  date: string;
  issue: string;
  body: string;
};

export const posts: Post[] = [
  {
    slug: "marketing-sites",
    issue: "N°01",
    title: "The Marketing Site Showdown",
    dek: "Astro vs. Next.js vs. plain HTML. When does a static generator win, and when is the extra machinery pure ceremony?",
    verdict: "Astro wins — unless you already live in React.",
    frameworks: ["Astro", "Next.js", "SvelteKit"],
    siteType: "Marketing / Landing",
    readTime: 6,
    date: "Jun 24, 2026",
    body: `
Marketing pages have one job: **load fast and convert**. Every kilobyte you ship past the fold is a paper cut on your bounce rate. So the framework question isn't "what can it do?" — it's "how little can it ship?"

## The contenders

Three tools show up to this fight repeatedly, and each represents a different philosophy about the modern web.

- **Astro** — Ship zero JavaScript by default. Add interactivity as islands, only where you need it.
- **Next.js** — Ship a full React runtime. Server components trim it, but the baseline is still React.
- **SvelteKit** — Ship compiled components with minimal runtime overhead. A sensible middle path.

## Where Astro wins

If your marketing site is what marketing sites usually are — a hero, three feature sections, testimonials, pricing, a footer — Astro will hand you a **~5kb JS payload** and Lighthouse scores that make your analytics team weep with joy. You write components in whatever flavor you already know (React, Vue, Svelte), and Astro strips them to static HTML at build time.

> The moment you stop shipping a framework runtime to render static content, everything gets faster.

## Where Next.js still makes sense

You're not building a marketing site in a vacuum. If your product app already runs on Next.js, forcing Astro into the mix means two deployment pipelines, two component libraries, two ways to think about routing. The **integration tax** is real. A Next.js marketing site inside your existing monorepo, using \`generateStaticParams\` and aggressive \`revalidate\` values, gets you to 95% of Astro's numbers with 5% of the friction.

## The uncomfortable truth

For a five-page marketing site with no dynamic behavior, **11ty or plain HTML** will beat both. The framework you pick matters less than the discipline to not add a carousel library, an animation library, and three fonts you don't need.
    `,
  },
  {
    slug: "dashboards",
    issue: "N°02",
    title: "Dashboards Want to Be Apps",
    dek: "Why SSR-first frameworks feel wrong for data-dense internal tools — and why TanStack Start might be the right kind of weird.",
    verdict: "Client-heavy is fine. Own it.",
    frameworks: ["TanStack Start", "Remix", "Next.js"],
    siteType: "Dashboard / Internal Tool",
    readTime: 8,
    date: "Jun 17, 2026",
    body: `
Dashboards violate every rule modern web frameworks are optimized for. Nobody is going to share your admin panel on Twitter. Google will never index it. The user is authenticated, sitting still, and about to spend forty minutes clicking things.

## The SSR trap

Server-side rendering exists for two reasons: **SEO** and **first paint on cold visits**. Neither applies to a tool your ops team logs into every morning. And yet, popular frameworks push SSR by default, which means every filter change round-trips through a server function to re-render a table you already rendered.

## What dashboards actually need

- **Fast tab-to-tab navigation** — no full page reloads
- **Optimistic updates** — mutations that feel instant
- **Sophisticated caching** — the same query shouldn't refetch six times
- **Type-safe params** — filters, pagination, sort state in the URL

That list reads like a TanStack Query brochure, and it's not an accident.

## The TanStack Start pitch

TanStack Start pairs a router that treats **URL state as first-class** with a Query layer that already knows how to invalidate, retry, and dedupe. Loaders run on the server for the first hit, then client navigations are instant. You get SSR when it helps (initial load, share links) and pure client behavior when it doesn't (every subsequent interaction).

> A dashboard isn't a document. Stop pretending it is.

## When to still reach for Next.js

If your team's mental model is already "server components everywhere," Next.js 15's caching primitives can absolutely deliver a great dashboard — you'll just spend more time thinking about which components are \`"use client"\` and less time thinking about your users.
    `,
  },
  {
    slug: "content-blogs",
    issue: "N°03",
    title: "Blogs, But Make Them Fast",
    dek: "MDX, RSS, and the annual question: should you just be using Hugo?",
    verdict: "Astro or Eleventy. Everything else is overkill.",
    frameworks: ["Astro", "Eleventy", "Hugo"],
    siteType: "Blog / Publication",
    readTime: 5,
    date: "Jun 10, 2026",
    body: `
A blog is a list of documents. That is the whole spec. If your framework choice makes that harder than it needs to be, you picked wrong.

## The MDX temptation

MDX is genuinely lovely — React components inline with prose, interactive diagrams next to paragraphs. But 90% of posts don't need it. If your last ten posts are just words and images, you're paying for a JSX parser you never use.

## What a good blog stack looks like

- **File-based content** — markdown files in git, no CMS unless you have non-technical writers
- **Fast builds** — you'll edit a typo and rebuild fifty times before shipping
- **RSS out of the box** — treat this as a hard requirement in 2026, the open web is back
- **View transitions** — that subtle cross-fade between posts is worth the fifteen lines of CSS

## Astro's home turf

Content collections in Astro are the closest thing the JS ecosystem has to "just markdown, but typed." You get frontmatter validation via Zod, automatic RSS generation, image optimization, and a build output that's essentially a folder of HTML.

## The Hugo case

If you can tolerate Go templates for twenty minutes, **Hugo builds a thousand-post blog in under a second**. No node_modules. No lockfile drama. It is dramatically the fastest option, and the correct pick for a blog whose only interactive element is a search box.
    `,
  },
  {
    slug: "ecommerce",
    issue: "N°04",
    title: "Ecommerce Is a Data Problem",
    dek: "Product pages, cart state, checkout flows. Why the framework matters less than your CDN.",
    verdict: "Whatever your team already ships.",
    frameworks: ["Next.js", "Remix", "SvelteKit"],
    siteType: "Ecommerce",
    readTime: 7,
    date: "Jun 3, 2026",
    body: `
Every ecommerce framework demo shows the same thing: a product grid that loads fast. What they don't show is what happens on **Black Friday at 9:04pm** when your product API is timing out and the cart microservice is refusing new connections.

## The real bottlenecks

- **Product data fetch** — probably from Shopify, BigCommerce, or a homegrown API you regret
- **Cart persistence** — cookies, localStorage, or server session; each has failure modes
- **Payment provider handoff** — Stripe, Adyen, whatever your finance team negotiated
- **Search** — if you're using framework-native search past 500 products, you'll rewrite it in six months

Notice that the framework is barely involved. It's plumbing between these systems.

## What actually matters

**Cache aggressively at the edge.** A product listing that hits your backend on every request is a fragile product listing. Whether you use Next.js ISR, Remix's cache headers, or Astro's on-demand rendering, the win is CDN-level caching with well-designed invalidation.

> The framework you argue about on Twitter is 5% of the problem. The CDN and cart architecture are the other 95%.

## Practical recommendation

Pick the framework your team already ships confidently. Ecommerce is unforgiving of unfamiliarity — the day a customer's card gets double-charged is not the day you want to be debugging your framework's data mutation semantics for the first time.
    `,
  },
  {
    slug: "docs-sites",
    issue: "N°05",
    title: "Documentation Deserves Better",
    dek: "Search, versioning, code samples that actually run. What makes a docs site great, and why so few are.",
    verdict: "Nextra, Starlight, or Docusaurus — in that order.",
    frameworks: ["Nextra", "Starlight", "Docusaurus"],
    siteType: "Documentation",
    readTime: 5,
    date: "May 27, 2026",
    body: `
Great docs sites share a short list of qualities. Instant search. Persistent sidebar. Copy-button on every code block. Versioning that doesn't gaslight you. Nothing on that list is exotic, and yet most documentation sites fail at least two of them.

## The framework doesn't matter, the theme does

You're not "building" a docs site — you're **configuring** one. Which is why the correct question is "which theme is closest to what I want, so I can write less code?"

- **Starlight** (Astro) — the fastest builds, cleanest defaults, best out-of-box theme
- **Nextra** (Next.js) — the best if you already live in Next
- **Docusaurus** — mature, versioned, occasionally clunky

## The one thing that always breaks

**Search.** Client-side search dies past a few hundred pages. Algolia DocSearch is free for open source and worth every dollar for everyone else. Do this on day one, not the day someone complains.

## Interactive samples

Runnable code samples via Sandpack or StackBlitz Web Containers turn a docs site from a **reference** into a **playground**. It's the single highest-leverage feature you can add.
    `,
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
