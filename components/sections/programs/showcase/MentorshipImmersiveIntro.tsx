'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { SanityProgram } from '@/lib/types'
import { ApproachCard, ProgramImageAsset } from './types'

type MentorshipImmersiveIntroProps = {
  program?: SanityProgram | null
  heroDescription: string
  heroImage?: string
  tagline: string
  cards: ApproachCard[]
  images?: ProgramImageAsset[]
  applyStatusFallback: string
}

export default function MentorshipImmersiveIntro({
  program,
  heroDescription,
  heroImage,
  tagline,
  cards,
  applyStatusFallback,
}: MentorshipImmersiveIntroProps) {
  const heroRef = useRef<HTMLDivElement | null>(null)
  const textSectionRef = useRef<HTMLDivElement | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const { scrollYProgress: textSectionProgress } = useScroll({
    target: textSectionRef,
    offset: ['start end', 'end start'],
  })

  const heroImageY = useTransform(heroScrollProgress, [0, 1], ['0vh', '16vh'])
  const heroContentY = useTransform(heroScrollProgress, [0, 1], ['0vh', '10vh'])
  const heroOverlayOpacity = useTransform(heroScrollProgress, [0, 1], [0.32, 0.72])
  const textSectionContentY = useTransform(textSectionProgress, [0, 1], ['4vh', '-4vh'])

  const heroImageStyle = shouldReduceMotion ? undefined : { y: heroImageY }
  const heroContentStyle = shouldReduceMotion ? undefined : { y: heroContentY }
  const heroOverlayStyle = shouldReduceMotion ? undefined : { opacity: heroOverlayOpacity }
  const textContentStyle = shouldReduceMotion ? undefined : { y: textSectionContentY }

  const heroBackgroundImage = heroImage || '/event-pics/mentorship4.jpg'
  return (
    <>
      <section
        ref={heroRef}
        className="relative mt-[72px] h-[calc(100svh-72px)] overflow-hidden border-b border-white/10 bg-surface-deep md:mt-[92px] md:h-[calc(100svh-92px)]"
      >
        <motion.div style={heroImageStyle} className="absolute inset-0 scale-[1.08]">
          <Image
            src={heroBackgroundImage}
            alt="Mentorship x Databricks hero"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(179,0,255,0.2),transparent_34%),radial-gradient(circle_at_top_right,rgba(255,104,54,0.12),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.58)_74%,rgba(0,0,0,0.82)_100%)]" />
        <motion.div style={heroOverlayStyle} className="absolute inset-0 bg-black/45" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:34px_34px] opacity-[0.08]" />

        <motion.div
          style={heroContentStyle}
          className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-[10svh] md:px-10 lg:px-[6vw] xl:px-[7vw]"
        >
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-[10px] border border-[rgba(255,104,54,0.4)] bg-[rgba(255,104,54,0.12)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#FFD3C3]">
              Mentorship x Databricks
            </span>
            <span className="rounded-[10px] border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/48">
              Bespoke Program
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)] lg:items-end">
            <div className="max-w-[56rem]">
              <h1 className="max-w-[9.2ch] font-[family-name:var(--font-satoshi)] text-[4.4rem] font-semibold uppercase leading-[0.8] tracking-[-0.06em] text-white sm:text-[5.7rem] lg:text-[8rem] xl:text-[9.2rem]">
                Mentorship
                <br />
                <span className="text-[#FFB194]">x Databricks</span>
              </h1>

              <p className="mt-7 max-w-[34rem] font-[family-name:var(--font-inter)] text-[1rem] leading-7 text-white/72 md:text-[1.08rem]">
                {heroDescription}
              </p>
            </div>

            <div className="flex flex-col gap-5 rounded-[18px] border border-white/10 bg-[rgba(10,10,10,0.58)] p-5 backdrop-blur-sm">
              <div className="flex flex-wrap gap-2">
                {['Biweekly mentor sessions', 'Enterprise-ready workflows', 'Operator feedback loops'].map((item) => (
                  <span
                    key={item}
                    className="rounded-[10px] border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/72"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {program?.apply?.status ? (
                  <Link
                    href={program.apply.link || '#'}
                    className="rounded-[10px] border border-[rgba(255,104,54,0.54)] bg-[rgba(255,104,54,0.12)] px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-[#FF6836] hover:text-black"
                  >
                    {program.apply.ctaLabel || 'Apply Now'}
                  </Link>
                ) : (
                  <span className="rounded-[10px] border border-white/10 px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white/28">
                    Applications Closed
                  </span>
                )}

                <span className="text-[12px] uppercase tracking-[0.18em] text-white/28">
                  {program?.apply?.statusText || applyStatusFallback}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section
        ref={textSectionRef}
        className="relative min-h-[100svh] overflow-hidden border-b border-white/10 bg-surface-raised"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(179,0,255,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(77,255,148,0.08),transparent_24%),linear-gradient(180deg,#101013_0%,#0B0B0D_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:26px_26px] opacity-[0.06]" />

        <motion.div
          style={textContentStyle}
          className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-center px-5 py-10 md:px-10 lg:px-[6vw] xl:px-[7vw]"
        >
          <div className="border-b border-white/10 pb-10 lg:pb-12">
            <h2 className="max-w-none font-[family-name:var(--font-satoshi)] text-[3.4rem] font-semibold leading-[0.84] tracking-[-0.05em] text-white sm:text-[4.4rem] lg:text-[6.4rem]">
              {tagline}
            </h2>
          </div>

          <div className="grid gap-4 pt-8 lg:grid-cols-3 lg:pt-10">
            {cards.map((card, index) => (
              <article
                key={card.id}
                className="flex h-full flex-col gap-5 rounded-[20px] border border-white/10 bg-[rgba(14,14,16,0.74)] p-6 shadow-[0_20px_48px_rgba(0,0,0,0.18)] backdrop-blur-sm md:p-7"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="h-[2px] w-14"
                    style={{ backgroundColor: card.accentColor }}
                  />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/48">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-satoshi)] text-[2.2rem] font-medium leading-[0.9] tracking-[-0.04em] whitespace-pre-line text-white">
                  {card.title}
                </h3>

                <p className="font-[family-name:var(--font-inter)] text-[0.98rem] leading-7 text-white/70">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  )
}
