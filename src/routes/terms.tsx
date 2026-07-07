import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Stackpaper" },
      {
        name: "description",
        content:
          "The terms that govern use of Stackpaper — content usage, disclaimers, and liability.",
      },
      { property: "og:title", content: "Terms & Conditions — Stackpaper" },
      { property: "og:description", content: "Terms of use for Stackpaper." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
});

function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms & Conditions" updated="July 5, 2026">
      <p>
        By accessing Stackpaper, you agree to the terms below. If you do not agree, do
        not use the site. These terms may be updated from time to time; continued use
        after changes constitutes acceptance.
      </p>

      <h2>Content and copyright</h2>
      <p>
        All essays, images, and design elements on Stackpaper are © Stackpaper
        Editions, unless credited otherwise. You may quote short excerpts for review or
        commentary with attribution and a link back. You may not republish full essays
        or use our content to train machine-learning models without written permission.
      </p>

      <h2>Third-party trademarks</h2>
      <p>
        Framework names (Next.js, Astro, SvelteKit, Remix, TanStack Start, Vue, and
        others) are the trademarks of their respective owners. Stackpaper is not
        affiliated with, endorsed by, or sponsored by any framework project.
      </p>

      <h2>Editorial opinions</h2>
      <p>
        Verdicts and recommendations on Stackpaper reflect the editors' independent
        opinion at the time of writing. Tooling evolves; a claim that was true in one
        issue may not be true in the next. Do not use Stackpaper as your only input
        for a production technical decision.
      </p>

      <h2>Advertising and links</h2>
      <p>
        Stackpaper may display advertisements (see our{" "}
        <Link to="/privacy" className="ink-link">privacy policy</Link>) and may contain
        links to external sites. We are not responsible for the content or practices of
        those sites.
      </p>

      <h2>Prohibited use</h2>
      <ul>
        <li>Scraping the site at abusive volume or bypassing rate limits.</li>
        <li>Reusing our content for commercial redistribution without permission.</li>
        <li>Using the site to harass, defame, or violate anyone's rights.</li>
      </ul>

      <h2>Disclaimer of warranties</h2>
      <p>
        Stackpaper is provided "as is." We make no warranties, express or implied,
        about the accuracy, completeness, or reliability of any content on the site.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Stackpaper and its contributors are not
        liable for any indirect, incidental, or consequential damages arising from your
        use of the site.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the jurisdiction in which Stackpaper is
        operated. Any disputes will be resolved in the courts of that jurisdiction.
      </p>
    </LegalPage>
  );
}
