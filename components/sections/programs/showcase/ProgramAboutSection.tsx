'use client'

import React from 'react'
import Image from 'next/image'
import { ApproachCard, ProgramImageAsset } from './types'

type ProgramAboutSectionProps = {
  eyebrow?: string
  title: string
  cards: ApproachCard[]
  images?: ProgramImageAsset[]
  renderFallbackVisual: (index: number) => React.ReactNode
}

export default function ProgramAboutSection({
  eyebrow = 'Our Approach',
  title,
  cards,
  images,
  renderFallbackVisual,
}: ProgramAboutSectionProps) {
  return (
    <section className="px-[5vw] lg:px-[8vw] py-[10svh] border-t border-white/10">
      <p className="font-[family-name:var(--font-inter)] text-[12px] font-semibold tracking-[0.22em] uppercase text-white/48 mb-4">
        {eyebrow}
      </p>
      <h2 className="text-display-2 text-white mb-16">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className="p-8 border border-white/10 bg-surface-raised flex flex-col gap-6"
            style={{ boxShadow: `inset 0 0 80px ${card.glow.replace(/0\.\d+\)$/, '0.16)')}` }}
          >
            {images?.[i] ? (
              <div className="relative w-full aspect-[4/3] border border-white/10 overflow-hidden bg-surface-deep">
                <Image
                  src={images[i].src}
                  alt={images[i].alt}
                  fill
                  className="object-cover opacity-90"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/5" />
              </div>
            ) : (
              <div className="w-full aspect-[4/3]">{renderFallbackVisual(i)}</div>
            )}
            <div>
              <h3 className="text-display-3 text-white mb-3 whitespace-pre-line">
                {card.title}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[15px] leading-relaxed text-white/72">
                {card.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
