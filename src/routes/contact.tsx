import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/site-config";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Stackpaper" },
      {
        name: "description",
        content:
          "Get in touch with Stackpaper — pitch an essay, report a correction, or say hello.",
      },
      { property: "og:title", content: "Contact — Stackpaper" },
      { property: "og:description", content: "Reach the Stackpaper editors." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  return (
    <>
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-16 md:pt-24">
        <div className="animate-rise">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ember">
            Correspondence
          </p>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[1.02] tracking-tight md:text-6xl">
            Write to the editors
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80">
            Pitch an essay, report a correction, or just say hello. We read every note —
            and answer most within a week.
          </p>
        </div>

        <div className="mt-16 grid gap-16 md:grid-cols-[2fr_1fr]">
          <div className="animate-rise" style={{ animationDelay: "120ms" }}>
            <ContactForm />
          </div>
          <aside
            className="border-l border-border/60 pl-8 animate-rise"
            style={{ animationDelay: "220ms" }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Or by email
            </div>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="ink-link mt-4 inline-block font-display text-lg text-ember"
            >
              {siteConfig.contactEmail}
            </a>

            <div className="mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              For pitches
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/75">
              Include a one-paragraph thesis, three bullet points of evidence, and a
              rough word count. We prefer 1,500–2,500 words.
            </p>

            <div className="mt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              For corrections
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/75">
              Link the essay and quote the passage. Corrections are dated and left
              visible.
            </p>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}
