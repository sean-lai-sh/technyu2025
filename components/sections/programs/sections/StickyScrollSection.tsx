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
    <section className="mt-18">
      <div className="mx-auto mb-6 max-w-[1240px] px-[5vw]">
        <h2
          className={`font-[family-name:var(--font-darker-grotesque)] text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl ${
            section.showUnderline ? 'underline underline-offset-8 decoration-white/40' : ''
          }`}
        >
          {section.heading}
        </h2>
      </div>
      <div className="mx-auto max-w-[1320px]">
        <StickyScroll
          content={content}
          containerClassName="min-h-[95vh]"
          contentClassName="rounded-2xl border border-white/10 bg-black/65 p-2 shadow-[inset_0_0_90px_rgba(77,255,148,0.06)]"
        />
      </div>
    </section>
  )
}
