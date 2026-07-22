import { Reveal } from "./Reveal";

const stats = [
  { n: "300+", l: "Properties captured" },
  { n: "48h", l: "Average turnaround" },
  { n: "CAAS", l: "Licensed operator" },
  { n: "5.0★", l: "Client rating" },
];

export function About() {
  return (
    <section id="about" className="px-6 py-40">
      <Reveal className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-6xl md:text-7xl">
          Licensed. Insured.{" "}
          <span className="text-primary">Obsessed with the shot.</span>
        </h2>
      </Reveal>

      <Reveal delay={200} className="mx-auto mt-24 grid max-w-4xl grid-cols-2 gap-12 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {s.n}
            </div>
            <div className="mt-2 text-xs tracking-wide text-muted-foreground">
              {s.l}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
