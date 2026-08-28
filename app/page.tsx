import type { Metadata } from "next";
import Image from "next/image";
import Hero from "@/components/sections/hero";
import Spotlight from "@/components/sections/spotlight";
import Values from "@/components/sections/values";
import History from "@/components/sections/history";
import About from "@/components/sections/about";
import HomeCTA from "@/components/sections/home-cta";
import AskAi from "@/components/sections/ask-ai";
import ProgramSectionV2 from "@/components/sections/programs_v2";
import { SITE_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Home",
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return (
    <div className="relative w-full h-fit min-h-screen">
      {/* Homepage backdrop: the gradient photo under a deep dark scrim,
          fixed behind every section from the very first frame */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/gradient-backdrop.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>
      <Hero />
      <History />
      <ProgramSectionV2 />
      <Spotlight />
      {/* <About /> */}
      
      {/* <Values /> */}

      <HomeCTA />
      <AskAi />
    </div>
  );
}
