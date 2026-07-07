import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Stackpaper" },
      {
        name: "description",
        content:
          "How Stackpaper collects, uses, and protects your data — including analytics, advertising, and newsletter subscriptions.",
      },
      { property: "og:title", content: "Privacy Policy — Stackpaper" },
      {
        property: "og:description",
        content: "Data collection and use at Stackpaper.",
      },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
});

function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="July 5, 2026">
      <p>
        This page describes what data Stackpaper collects, how we use it, and the
        choices you have. This is a plain-language summary of our practices — it is not
        legal advice, and it should be reviewed by counsel before Stackpaper is used
        for any regulated purpose.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Newsletter subscribers.</strong> If you subscribe, we store your email address to send you the newsletter and nothing else. We do not sell or share it.</li>
        <li><strong>Contact form submissions.</strong> The name, email, and message you send us. We use it only to reply.</li>
        <li><strong>Basic server logs.</strong> IP address, user agent, and request path, retained for up to 30 days for abuse prevention.</li>
        <li><strong>Privacy-friendly analytics.</strong> We use aggregated analytics to understand which essays perform. No cross-site tracking, no fingerprinting.</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        Stackpaper itself uses only strictly-necessary cookies (e.g. session state
        where required). Third-party services described below may set their own
        cookies.
      </p>

      <h2>Advertising</h2>
      <p>
        Stackpaper may display advertisements served by <strong>Google AdSense</strong>.
        Google and its partners use cookies to serve ads based on your prior visits to
        our site or other sites on the web. You can opt out of personalised advertising
        by visiting{" "}
        <a href="https://www.google.com/settings/ads" className="ink-link text-ember" rel="noopener noreferrer" target="_blank">
          Google Ads Settings
        </a>{" "}
        or, more broadly, at{" "}
        <a href="https://www.aboutads.info/choices/" className="ink-link text-ember" rel="noopener noreferrer" target="_blank">
          aboutads.info
        </a>.
      </p>

      <h2>Third parties</h2>
      <ul>
        <li>Email delivery for the newsletter is handled by a transactional email provider.</li>
        <li>Site hosting is provided by our infrastructure vendors.</li>
        <li>Analytics is aggregated only — no personally-identifiable data leaves our servers.</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        You can unsubscribe from the newsletter at any time using the link in every
        email. You can request deletion of any data we hold about you by emailing{" "}
        <a href={`mailto:${siteConfig.contactEmail}`} className="ink-link text-ember">
          {siteConfig.contactEmail}
        </a>. If you're in the EU/UK, you have rights under GDPR including access,
        rectification, erasure, and portability.
      </p>

      <h2>Children</h2>
      <p>Stackpaper is not directed to children under 13, and we do not knowingly collect data from them.</p>

      <h2>Changes</h2>
      <p>
        We'll update the "Last updated" date at the top of this page when the policy
        changes. Continued use of Stackpaper after a change constitutes acceptance of
        the revised policy.
      </p>

      <p>
        Questions? See our <Link to="/contact" className="ink-link">contact page</Link>.
      </p>
    </LegalPage>
  );
}
