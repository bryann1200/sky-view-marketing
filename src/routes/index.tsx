import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/vantage/Nav";
import { Hero } from "@/components/vantage/Hero";
import { Showcase } from "@/components/vantage/Showcase";
import { Services } from "@/components/vantage/Services";
import { Contact } from "@/components/vantage/Contact";
import heroImg from "@/assets/hero-singapore.jpg";

const SITE_URL = "https://sky-view-marketing.lovable.app";
const OG_IMAGE = `${SITE_URL}${heroImg}`;

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
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Vantage Aerial Studio — See it from above." },
      {
        name: "twitter:description",
        content:
          "Drone photography and video for Singapore real estate. Marina Bay to Sentosa, framed from the sky.",
      },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Showcase />
      <Services />
      <Contact />
      <Toaster position="bottom-center" />
    </main>
  );
}
