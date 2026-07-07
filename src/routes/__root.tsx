import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider } from "../components/theme-provider";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Error 404</p>
        <h1 className="mt-4 font-display text-6xl font-medium tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This page has been lost to the archives.
        </p>
        <Link to="/" className="ink-link mt-8 inline-block font-mono text-sm uppercase tracking-widest">
          ← Back to index
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Press failure</p>
        <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-foreground">
          The presses jammed
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Something went wrong loading this page.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="ink-link font-mono text-sm uppercase tracking-widest"
          >
            Try again
          </button>
          <a href="/" className="ink-link font-mono text-sm uppercase tracking-widest">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Stackpaper — Which framework, for which site?" },
      {
        name: "description",
        content:
          "An opinionated technical journal matching web frameworks to the sites they're actually good at. Next.js, Astro, SvelteKit, Remix, TanStack Start, compared with a point of view.",
      },
      { name: "author", content: "Stackpaper" },
      { property: "og:site_name", content: "Stackpaper" },
      { property: "og:title", content: "Stackpaper — Which framework, for which site?" },
      {
        property: "og:description",
        content:
          "An opinionated journal matching web frameworks to the sites they're actually good at.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..700,0..100&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="grain min-h-screen">
          <Outlet />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
