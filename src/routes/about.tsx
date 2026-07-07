import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Stackpaper" },
      {
        name: "description",
        content:
          "Stackpaper is an independent editorial journal about web frameworks and the sites they're actually built for.",
      },
      { property: "og:title", content: "About — Stackpaper" },
      {
        property: "og:description",
        content:
          "An independent editorial journal about web frameworks — who's behind it and what we cover.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function AboutPage() {
  return (
    <LegalPage eyebrow="Colophon" title="About Stackpaper" updated="July 5, 2026">
      <p>
        <strong>Stackpaper</strong> is an independent editorial journal that argues,
        gently, that most framework debates would end faster if we asked what the site
        was for. We publish deeply-researched essays comparing modern web frameworks —
        Next.js, Astro, SvelteKit, Remix, TanStack Start, Hugo, and the rest — against
        the concrete workloads they're used for.
      </p>

      <h2>What we cover</h2>
      <p>
        Every essay is structured around a <em>kind of site</em>: marketing pages,
        dashboards, blogs, ecommerce, documentation, developer tools, and the long tail
        of internal apps. We take positions. We publish verdicts. We update them when
        the ecosystem earns it.
      </p>

      <h2>Editorial standards</h2>
      <ul>
        <li>Every essay is written and edited by a human. AI is used for research and outlines only, never for prose.</li>
        <li>We disclose paid partnerships in the essay itself. We have none at time of writing.</li>
        <li>Corrections are dated and left visible in the footer of the affected essay.</li>
      </ul>

      <h2>Who's behind it</h2>
      <p>
        Stackpaper is a small independent project — currently one editor and a rotating
        set of contributors. If you'd like to write for us, or you spotted something we
        got wrong, <Link to="/contact" className="ink-link">get in touch</Link>.
      </p>

      <h2>How we make money</h2>
      <p>
        Stackpaper is reader-supported and may show a small number of contextual ads
        served via Google AdSense. We do not sell your email address or reading data.
        See our <Link to="/privacy" className="ink-link">privacy policy</Link> for
        details.
      </p>

      <p>Reach us at <a href={`mailto:${siteConfig.contactEmail}`} className="ink-link text-ember">{siteConfig.contactEmail}</a>.</p>
    </LegalPage>
  );
}
