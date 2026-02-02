'use client'
import React from 'react'
import Image from 'next/image'
import { StickyScrollSection } from '@/lib/types'
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal'

interface StickyScrollSectionProps {
  section: StickyScrollSection
}

export default function StickyScrollSectionComponent({ section }: StickyScrollSectionProps) {
  const content = section.items.map((item) => ({
    title: item.title,
    description: item.description,
    content: item.imageUrl ? (
      <Image
        src={item.imageUrl}
        alt={item.title}
        fill
        className="object-contain w-full h-full"
      />
    ) : null,
    mobileContent: item.imageUrl ? (
      <div className="relative w-full h-[300px]">
        <Image
          src={item.mobileImageUrl || item.imageUrl}
          alt={item.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>
    ) : null,
  }))

  return (
    <section className="mt-16">
      <h2
        className={`text-white text-3xl md:text-4xl lg:text-5xl font-bold text-left mb-4 md:mb-8 px-[5vw] ${
          section.showUnderline ? 'underline underline-offset-10' : ''
        }`}
      >
        {section.heading}
      </h2>
      <StickyScroll content={content} />
    </section>
  )
}
