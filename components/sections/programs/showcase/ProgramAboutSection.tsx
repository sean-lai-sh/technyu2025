'use client'

import React from 'react'
import Image from 'next/image'
import { ApproachCard, ProgramImageAsset } from './types'

type ProgramAboutSectionProps = {
  title: string
  cards: ApproachCard[]
  images?: ProgramImageAsset[]
  renderFallbackVisual: (index: number) => React.ReactNode
}

export default function ProgramAboutSection({
  title,
  cards,
  images,
  renderFallbackVisual,
}: ProgramAboutSectionProps) {
  return (
    <section className="px-[5vw] lg:px-[8vw] py-[10svh] border-t border-[#EDEDED]/8">
      <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.15em] uppercase opacity-55 mb-4">
        Our Approach
      </p>
      <h2
        className="font-[family-name:var(--font-darker-grotesque)] font-medium text-[#EDEDED] mb-16"
        style={{ fontSize: 'clamp(40px, 6vw, 68px)', letterSpacing: '-1.2px' }}
      >
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className="p-8 border border-[#EDEDED] bg-black flex flex-col gap-6"
            style={{ boxShadow: `inset 0px 0px 150px ${card.glow}` }}
          >
            {images?.[i] ? (
              <div className="relative w-full aspect-[4/3] border border-[#EDEDED]/12 overflow-hidden bg-black">
                <Image
                  src={images[i].src}
                  alt={images[i].alt}
                  fill
                  className="object-cover opacity-85"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/5" />
              </div>
            ) : (
              <div className="w-full aspect-[4/3]">{renderFallbackVisual(i)}</div>
            )}
            <div>
              <h3
                className="font-[family-name:var(--font-darker-grotesque)] font-medium text-[#EDEDED] mb-3 whitespace-pre-line leading-tight"
                style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', letterSpacing: '-1px' }}
              >
                {card.title}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[15px] leading-relaxed text-[#EDEDED] opacity-68">
                {card.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
