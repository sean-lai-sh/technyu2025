import React from 'react'
import { LogoSliderSection } from '@/lib/types'
import LogoSlider from '@/components/ui/logo-slider'

interface LogoSliderSectionProps {
  section: LogoSliderSection
}

export default function LogoSliderSectionComponent({ section }: LogoSliderSectionProps) {
  // Transform Sanity logos to the format LogoSlider expects
  const logos = section.logos.map((logo) => ({
    src: logo.imageUrl,
    alt: logo.alt,
    width: logo.width || 100,
    height: logo.height || 60,
  }))

  return (
    <section className="mt-18">
      <div className="mx-auto max-w-[1240px] px-[5vw]">
        <h2 className="mb-6 font-[family-name:var(--font-satoshi)] text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
          {section.heading}
        </h2>
        {section.body && (
          <p className="mb-8 max-w-[72ch] text-base leading-relaxed text-white/90 md:text-lg">{section.body}</p>
        )}
      </div>
      <div className="rounded-xl border-y border-white/10 bg-black/40 py-2">
        <LogoSlider logos={logos} speed={section.speed || 40} className="mb-0" />
      </div>
    </section>
  )
}
