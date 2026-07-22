import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Studio", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          {/* LOGO SLOT — replace with uploaded Vantage Aerial mark */}
          <div
            aria-label="Vantage Aerial logo"
            className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-[10px] font-bold tracking-tight text-background"
          >
            VA
          </div>
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">
            Vantage Aerial.
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={onBook}
          className="rounded-full bg-primary px-4 py-1.5 text-[12px] font-medium text-primary-foreground transition-transform hover:scale-[1.03] active:scale-[0.98]"
        >
          Book a shoot
        </button>
      </nav>
    </header>
  );
}
