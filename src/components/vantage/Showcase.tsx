import { useEffect, useRef, useState } from "react";
import marina from "@/assets/prop-marina.jpg";
import sentosa from "@/assets/prop-sentosa.jpg";
import bukit from "@/assets/prop-bukit.jpg";
import orchard from "@/assets/prop-orchard.jpg";
import { Reveal } from "./Reveal";
import { fetchSiteMedia, fetchSiteText, type SiteMediaItem } from "@/lib/site-media";

type Item = { slot: string; kicker: string; title: string; img: string };

const defaultItems: Item[] = [
  { slot: "showcase-1", kicker: "Marina Bay", title: "The skyline, in one uninterrupted sweep.", img: marina },
  { slot: "showcase-2", kicker: "Sentosa Cove", title: "A private villa, framed by the sea.", img: sentosa },
  { slot: "showcase-3", kicker: "Bukit Timah", title: "A landed estate under the canopy.", img: bukit },
  { slot: "showcase-4", kicker: "Orchard Road", title: "A penthouse above the city lights.", img: orchard },
];

function ShowcaseItem({ item, i }: { item: Item; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const [zoomed, setZoomed] = useState(false);

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

  useEffect(() => {
    if (!zoomed) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [zoomed]);

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

      <Reveal delay={150} className="mx-auto w-full max-w-6xl">
        <div className="relative mx-auto overflow-hidden rounded-2xl bg-muted shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]">
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            width={1600}
            height={1000}
            className="mx-auto h-[60vh] w-full object-cover object-center will-change-transform sm:h-[75vh]"
            style={{
              transform: `scale(${1.05 + (t - 0.5) * 0.08}) translateY(${(t - 0.5) * -30}px)`,
            }}
          />
          {/* Tap to enlarge — phone only */}
          <button
            type="button"
            onClick={() => setZoomed(true)}
            aria-label={`Enlarge photo: ${item.title}`}
            className="absolute inset-0 sm:hidden"
          >
            <span className="absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur">
              Tap to enlarge
            </span>
          </button>
        </div>
      </Reveal>

      {zoomed && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-3 sm:hidden"
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-modal="true"
        >
          <img
            src={item.img}
            alt={item.title}
            className="max-h-full max-w-full object-contain"
          />
          <button
            type="button"
            onClick={() => setZoomed(false)}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur"
          >
            Close
          </button>
        </div>
      )}
    </section>
  );
}


export function Showcase() {
  const [overrides, setOverrides] = useState<Record<string, SiteMediaItem>>({});
  const [text, setText] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchSiteMedia().then(setOverrides);
    fetchSiteText().then(setText);
  }, []);

  const items: Item[] = defaultItems.map((item) => {
    const o = overrides[item.slot];
    // Text overrides (edited from the admin's Text section) take priority
    // over whatever came with an uploaded image, which itself takes
    // priority over the hardcoded default.
    const kicker = text[`${item.slot}-location`] ?? o?.location ?? item.kicker;
    const title = text[`${item.slot}-title`] ?? o?.title ?? item.title;
    const img = o?.url ?? item.img;
    return { ...item, img, kicker, title };
  });

  return (
    <div id="work">
      <Reveal className="mx-auto max-w-3xl px-6 pt-32 pb-8 text-center">
        <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Selected work
        </div>
        <h2 className="mt-6 text-4xl font-semibold tracking-[-0.03em] sm:text-6xl">
          A few of our favorite <span className="text-primary">altitudes.</span>
        </h2>
      </Reveal>

      {items.map((item, i) => (
        <ShowcaseItem key={item.slot} item={item} i={i} />
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
