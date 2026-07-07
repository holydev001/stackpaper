import { useState } from "react";
import { z } from "zod";
import { postJSON } from "@/lib/api";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  message: z.string().trim().min(10, "Message needs at least 10 characters").max(2000),
});

type Status = "idle" | "loading" | "ok" | "error";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setStatus("error");
      setNotice(parsed.error.issues[0].message);
      return;
    }
    setStatus("loading");
    setNotice("");
    try {
      await postJSON("/contact", parsed.data);
      setStatus("ok");
      setNotice("Thanks — we'll be in touch.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setNotice(
        err instanceof Error && err.message.startsWith("Backend not configured")
          ? "The contact form isn't wired to a backend yet. Email hello@stackpaper.dev in the meantime."
          : "Something went wrong. Try again.",
      );
    }
  }

  const field =
    "w-full rounded-none border-b border-border bg-transparent px-1 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-ember focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Name
        </label>
        <input
          className={field}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Ada Lovelace"
          disabled={status === "loading"}
        />
      </div>
      <div>
        <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Email
        </label>
        <input
          type="email"
          className={field}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@somewhere.com"
          disabled={status === "loading"}
        />
      </div>
      <div>
        <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Message
        </label>
        <textarea
          rows={5}
          className={`${field} resize-none`}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="What's on your mind?"
          disabled={status === "loading"}
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-2 bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-background transition-colors hover:bg-ember disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send message"} <span>→</span>
        </button>
        {notice && (
          <p
            role="status"
            className={`font-mono text-[11px] uppercase tracking-widest ${
              status === "ok" ? "text-moss" : "text-ember"
            }`}
          >
            {notice}
          </p>
        )}
      </div>
    </form>
  );
}
