import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/hero-singapore.jpg";

export function Hero() {
  const [t, setT] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -rect.top / (window.innerHeight || 1)));
      setT(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `scale(${1.05 + t * 0.15}) translateY(${t * 40}px)`,
          transition: "transform 0.1s linear",
        }}
      >
        <img
          src={heroImg}
          alt="Aerial view of Singapore skyline"
          className="h-full w-full object-cover opacity-80"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      <div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        style={{
          opacity: 1 - t * 1.4,
          transform: `translateY(${t * -20}px)`,
        }}
      >
        <h1 className="text-5xl font-semibold tracking-[-0.03em] text-white sm:text-7xl md:text-8xl">
          See it from <span className="text-primary">above.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm text-white/70 sm:text-base">
          Drone photography and video for Singapore real estate.
        </p>
        <div className="mt-10">
          <a
            href="#work"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-5 py-2 text-[13px] font-medium text-foreground transition-transform hover:scale-[1.03]"
          >
            See the reel
          </a>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[11px] uppercase tracking-[0.2em] text-white/60"
        style={{ opacity: 1 - t * 2 }}
      >
        Scroll
      </div>
    </section>
  );
}
