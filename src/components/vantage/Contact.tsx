import { useState } from "react";
import { Reveal } from "./Reveal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function Contact({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (b: boolean) => void;
}) {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setOpen(false);
      toast.success("Thanks — we'll be in touch within one business day.");
    }, 600);
  };

  return (
    <>
      <section id="contact" className="px-6 pt-40 pb-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-6xl md:text-7xl">
            Let's fly your <span className="text-accent">next listing.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
            Tell us about the property. We'll come back with a shot list, a
            timeline, and a quote — usually within a day.
          </p>
          <div className="mt-10">
            <button
              onClick={() => setOpen(true)}
              className="rounded-full bg-primary px-5 py-2 text-[13px] font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Start a project
            </button>
          </div>
        </Reveal>
      </section>

      <footer className="px-6 pb-16 text-center">
        <p className="text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} Vantage Aerial Studio · Singapore
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground/70">
          CAAS-licensed UA operator · Fully insured commercial drone services
        </p>
      </footer>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold tracking-tight">
              Start a project
            </DialogTitle>
            <DialogDescription>
              A few details and we'll take it from there.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit} className="mt-2 space-y-4">
            <div>
              <label className="text-xs text-muted-foreground">Name</label>
              <input
                required
                name="name"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <input
                required
                type="email"
                name="email"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Message</label>
              <textarea
                required
                name="message"
                rows={4}
                className="mt-1 w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring/40"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
