import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/vantage/Nav";
import { Hero } from "@/components/vantage/Hero";
import { Showcase } from "@/components/vantage/Showcase";
import { Services } from "@/components/vantage/Services";
import { About } from "@/components/vantage/About";
import { Contact } from "@/components/vantage/Contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Vantage Aerial Studio — Singapore Drone Photography for Real Estate" },
      {
        name: "description",
        content:
          "Cinematic aerial photography and video for Singapore's most extraordinary properties. CAAS-licensed, fully insured, 48-hour turnaround.",
      },
      { property: "og:title", content: "Vantage Aerial Studio — See it from above." },
      {
        property: "og:description",
        content:
          "Drone photography and video for Singapore real estate. Marina Bay to Sentosa, framed from the sky.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav onBook={() => setContactOpen(true)} />
      <Hero />
      <Showcase />
      <Services />
      <About />
      <Contact open={contactOpen} setOpen={setContactOpen} />
      <Toaster position="bottom-center" />
    </main>
  );
}
