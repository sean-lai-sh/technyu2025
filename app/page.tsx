import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import Spotlight from "@/components/sections/spotlight";
import Values from "@/components/sections/values";
import History from "@/components/sections/history";
import About from "@/components/sections/about";
import HomeCTA from "@/components/sections/home-cta";
import ProgramSectionV2 from "@/components/sections/programs_v2";
import { SITE_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Home",
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return (
    <div className="w-full h-fit bg-black min-h-screen">
      <Hero />
      <Spotlight />
      <About />
      <History />
      <Values />
      <ProgramSectionV2 />
      <HomeCTA />
    </div>
  );
}
