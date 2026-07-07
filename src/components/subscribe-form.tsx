import { useState } from "react";
import { z } from "zod";
import { postJSON } from "@/lib/api";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
});

type Status = "idle" | "loading" | "ok" | "error";

export function SubscribeForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0].message);
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      await postJSON("/subscribe", { email: parsed.data.email });
      setStatus("ok");
      setMessage("You're on the list. Check your inbox.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error && err.message.startsWith("Backend not configured")
          ? "Subscribe is coming soon — the newsletter goes live shortly."
          : "Something went wrong. Try again in a moment.",
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div
        className={`flex flex-col gap-3 ${
          compact ? "sm:flex-row" : "sm:flex-row sm:items-stretch"
        }`}
      >
        <label htmlFor="subscribe-email" className="sr-only">
          Email
        </label>
        <input
          id="subscribe-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@somewhere.com"
          className="flex-1 rounded-none border-b border-foreground bg-transparent px-1 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-ember focus:outline-none"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex items-center justify-center gap-2 bg-foreground px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-background transition-colors hover:bg-ember disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Subscribe"}
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>
      {message && (
        <p
          className={`mt-3 font-mono text-[11px] uppercase tracking-widest ${
            status === "ok" ? "text-moss" : "text-ember"
          }`}
          role="status"
        >
          {message}
        </p>
      )}
      {!message && (
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          One issue, every other Wednesday. No ads, no tracking.
        </p>
      )}
    </form>
  );
}
