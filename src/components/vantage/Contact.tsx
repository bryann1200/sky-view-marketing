import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { fetchSiteText } from "@/lib/site-media";

export function Contact() {
  const [text, setText] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchSiteText().then(setText);
  }, []);

  const headline = text["contact-headline"] ?? "Let's fly your next listing.";
  const subtitle =
    text["contact-subtitle"] ??
    "Tell us about the property. We'll send back a shot list, a date, and a price — usually the same day.";

  return (
    <>
      <section id="contact" className="px-6 pt-40 pb-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-6xl md:text-7xl">
            {headline}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
            {subtitle}
          </p>
          <div className="mt-10">
            <a
              href="https://wa.me/6594537393"
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-full bg-primary px-5 py-2 text-[13px] font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Start a project
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="px-6 pb-16 text-center">
        <p className="text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} Vantage Aerial Studio · Singapore
        </p>
      </footer>
    </>
  );
}
