import { useEffect, useRef, useState } from "react";
import marina from "@/assets/prop-marina.jpg";
import sentosa from "@/assets/prop-sentosa.jpg";
import bukit from "@/assets/prop-bukit.jpg";
import orchard from "@/assets/prop-orchard.jpg";
import { Reveal } from "./Reveal";

type Item = { kicker: string; title: string; img: string };

const items: Item[] = [
  { kicker: "Marina Bay", title: "The skyline, in one uninterrupted sweep.", img: marina },
  { kicker: "Sentosa Cove", title: "A private villa, framed by the sea.", img: sentosa },
  { kicker: "Bukit Timah", title: "A landed estate under the canopy.", img: bukit },
  { kicker: "Orchard Road", title: "A penthouse above the city lights.", img: orchard },
];

function ShowcaseItem({ item, i }: { item: Item; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p =
        (window.innerHeight - rect.top) /
        (window.innerHeight + rect.height);
      setT(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <Reveal className="mb-10 text-center">
        <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          {String(i + 1).padStart(2, "0")} · {item.kicker}
        </div>
        <h3 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl md:text-6xl">
          {item.title}
        </h3>
      </Reveal>

      <Reveal delay={150} className="w-full max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl bg-muted shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]">
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            width={1600}
            height={1000}
            className="h-[60vh] w-full object-cover will-change-transform sm:h-[75vh]"
            style={{
              transform: `scale(${1.05 + (t - 0.5) * 0.08}) translateY(${(t - 0.5) * -30}px)`,
            }}
          />
        </div>
      </Reveal>
    </section>
  );
}

export function Showcase() {
  return (
    <div id="work">
      <Reveal className="mx-auto max-w-3xl px-6 pt-32 pb-8 text-center">
        <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Selected work
        </div>
        <h2 className="mt-6 text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">
          A few of our favorite <span className="text-accent">altitudes.</span>
        </h2>
      </Reveal>

      {items.map((item, i) => (
        <ShowcaseItem key={item.kicker} item={item} i={i} />
      ))}

      <Reveal className="pb-40 text-center">
        <a
          href="#contact"
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground underline underline-offset-4 transition-opacity hover:opacity-70"
        >
          View all work →
        </a>
      </Reveal>
    </div>
  );
}
