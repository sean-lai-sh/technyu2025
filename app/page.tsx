import type { Metadata } from "next";
import ProgramSection from "@/components/sections/programs/program_section";
import Hero from "@/components/sections/hero";
import Values from "@/components/sections/values";
import History from "@/components/sections/history";
import About from "@/components/sections/about";
import { SITE_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Home",
  description: SITE_DESCRIPTION,
};

export default function Home() {
  return (
    <div className="w-full h-fit bg-black min-h-screen">
      <Hero />
      <About />
      <History />
      <Values />
      <ProgramSection />
    </div>
  );
}
