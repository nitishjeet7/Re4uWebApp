import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="section-pad">
      <div className="content-grid">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Modern studio journal
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Thoughtful writing for product teams, designers, and founders.
            </h1>
            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
              Lumen Press is our editorial desk. We share experiments, product
              notes, and stories from the studio—crafted with care and a clear
              point of view.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/blog">Read the blog</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/about">About</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-3xl border border-border/70 bg-card/80 p-8 shadow-sm">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Featured themes
              </p>
              <h2 className="text-2xl font-semibold leading-snug">
                Clear narratives. Calm interfaces. Editorial depth.
              </h2>
              <p className="text-sm text-muted-foreground">
                Every post is crafted in Directus with a Tiptap editor, then
                published instantly to this site.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                <span className="rounded-full border border-border/70 px-3 py-1">
                  Product Notes
                </span>
                <span className="rounded-full border border-border/70 px-3 py-1">
                  Design Systems
                </span>
                <span className="rounded-full border border-border/70 px-3 py-1">
                  Studio Stories
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
