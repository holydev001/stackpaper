import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPost, posts } from "@/lib/posts";

export const Route = createFileRoute("/posts/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — Stackpaper` },
        { name: "description", content: post.dek },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.dek },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/posts/${params.slug}` },
        { property: "article:published_time", content: post.date },
      ],
      links: [{ rel: "canonical", href: `/posts/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.dek,
            datePublished: post.date,
            author: { "@type": "Organization", name: "Stackpaper" },
          }),
        },
      ],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-4 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-ember">Not in the archive</p>
        <h1 className="mt-4 font-display text-4xl">This essay doesn't exist</h1>
        <Link to="/" className="ink-link mt-8 inline-block font-mono text-sm uppercase tracking-widest">
          ← Back to index
        </Link>
      </div>
    </div>
  ),
});

function renderBody(body: string) {
  // Very small markdown-ish renderer for our controlled content
  const blocks = body.trim().split(/\n\n+/);
  return blocks.map((raw, i) => {
    const b = raw.trim();
    if (b.startsWith("## ")) return <h2 key={i}>{b.slice(3)}</h2>;
    if (b.startsWith("### ")) return <h3 key={i}>{b.slice(4)}</h3>;
    if (b.startsWith("> ")) return <blockquote key={i}>{b.slice(2)}</blockquote>;
    if (b.startsWith("- ")) {
      const items = b.split(/\n- /).map((s) => s.replace(/^- /, ""));
      return (
        <ul key={i}>
          {items.map((it, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: inline(it) }} />
          ))}
        </ul>
      );
    }
    return <p key={i} dangerouslySetInnerHTML={{ __html: inline(b) }} />;
  });
}

function inline(s: string) {
  return s
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>");
}

function PostPage() {
  const { post } = Route.useLoaderData();
  const idx = posts.findIndex((p) => p.slug === post.slug);
  const next = posts[idx + 1] ?? posts[0];

  return (
    <>
      <SiteHeader />

      <article className="mx-auto max-w-3xl px-6 pb-24 pt-16 md:pt-24">
        <div className="animate-rise">
          <Link
            to="/"
            className="ink-link font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground"
          >
            ← Back to index
          </Link>
        </div>

        <header className="mt-10 animate-rise" style={{ animationDelay: "80ms" }}>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <span className="text-ember">{post.issue}</span>
            <span>·</span>
            <span>{post.siteType}</span>
            <span>·</span>
            <span>{post.readTime} min</span>
          </div>
          <h1 className="mt-6 font-display text-5xl font-medium leading-[1.02] tracking-tight md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-2xl font-display text-xl italic leading-snug text-foreground/75">
            {post.dek}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-border/60 py-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span>{post.date}</span>
            <span className="text-ember">·</span>
            <span>Frameworks:</span>
            {post.frameworks.map((f: string) => (
              <span key={f} className="text-foreground">{f}</span>
            ))}
          </div>
        </header>

        <div className="prose-editorial mt-14 animate-rise" style={{ animationDelay: "200ms" }}>
          {renderBody(post.body)}
        </div>

        {/* Verdict card */}
        <aside className="mt-16 rounded-lg border border-ember/40 bg-ember-soft/40 p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ember">
            The verdict
          </div>
          <p className="mt-3 font-display text-2xl font-medium italic leading-snug text-foreground">
            "{post.verdict}"
          </p>
        </aside>

        {/* Next up */}
        <div className="mt-20 border-t border-border/60 pt-10">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Next in the volume
          </div>
          <Link
            to="/posts/$slug"
            params={{ slug: next.slug }}
            className="group mt-4 flex items-baseline justify-between gap-6"
          >
            <div>
              <div className="font-mono text-xs text-ember">{next.issue}</div>
              <h3 className="mt-1 font-display text-2xl font-medium tracking-tight transition-all duration-500 group-hover:translate-x-1 group-hover:text-ember md:text-3xl">
                {next.title}
              </h3>
            </div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Read →
            </span>
          </Link>
        </div>
      </article>

      <SiteFooter />
    </>
  );
}
