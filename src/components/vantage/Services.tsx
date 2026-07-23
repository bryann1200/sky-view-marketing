import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { fetchSiteText } from "@/lib/site-media";

const defaults = {
  headline: "covered.",
  services: [
    {
      n: "01",
      title: "Real estate photography",
      desc: "Sharp aerial stills that make a listing stop the scroll.",
    },
    {
      n: "02",
      title: "Cinematic walkthroughs",
      desc: "Video edits that move from the sky down to the front door.",
    },
    {
      n: "03",
      title: "Progress capture",
      desc: "Repeat flights that track a site week by week for developers and architects.",
    },
  ],
};

export function Services() {
  const [text, setText] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchSiteText().then(setText);
  }, []);

  const services = defaults.services.map((s, i) => ({
    n: s.n,
    title: text[`service-${i + 1}-title`] ?? s.title,
    desc: text[`service-${i + 1}-desc`] ?? s.desc,
  }));

  const headline = text["services-headline"] ?? "Every angle, covered.";

  return (
    <section id="services" className="px-6 py-40">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-6xl md:text-7xl">
          {headline}
        </h2>
      </Reveal>

      <div className="mx-auto mt-28 grid max-w-5xl gap-20 sm:grid-cols-3 sm:gap-10">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={i * 120} className="text-center">
            <div className="text-[11px] font-medium tracking-[0.25em] text-muted-foreground">
              {s.n}
            </div>
            <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
              {s.title}
            </h3>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {s.desc}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
