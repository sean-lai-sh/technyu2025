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
    <section className="mt-16">
      <div className="px-[5vw]">
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-left mb-8">
          {section.heading}
        </h2>
        {section.body && (
          <p className="text-white text-lg md:text-xl mb-8 max-w-3xl">{section.body}</p>
        )}
      </div>
      <LogoSlider logos={logos} speed={section.speed || 40} className="mb-8" />
    </section>
  )
}
