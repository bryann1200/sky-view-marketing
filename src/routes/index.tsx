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
      { title: "Vantage Aerial" },
      {
        name: "description",
        content:
          "Aerial photography Singapore (SG) — drone photos and video for property listings, from Marina Bay to Sentosa. 48-hour turnaround.",
      },
      { name: "keywords", content: "aerial photography sg, aerial photography singapore, drone photography singapore, real estate drone video" },

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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Vantage Aerial Studio",
          description:
            "Aerial photography and drone video for real estate in Singapore.",
          url: SITE_URL,
          image: OG_IMAGE,
          telephone: "+6594537393",
          areaServed: { "@type": "Country", name: "Singapore" },
          address: { "@type": "PostalAddress", addressCountry: "SG" },
          serviceType: "Aerial photography",
        }),
      },
    ],

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
