'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { PressPost } from '@/lib/types'
import { PressArticleSlab } from './press-article-slab'

export default function ImmersiveRevealArticle({ post }: { post: PressPost }) {
  const revealRef = useRef<HTMLDivElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: revealRef,
    offset: ['start start', 'end end'],
  })

  const mediaY = useTransform(scrollYProgress, [0, 0.58, 1], ['0%', '-8%', '-16%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.36, 0.76, 1], [0.14, 0.22, 0.76, 1])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.45, 0.78, 0.94], [1, 1, 0.28, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.78, 1], [1, 0.985, 0.96])
  const slabY = useTransform(scrollYProgress, [0, 0.34, 0.56], ['88px', '28px', '0px'])

  const mediaStyle = shouldReduceMotion ? undefined : { y: mediaY }
  const overlayStyle = shouldReduceMotion ? undefined : { opacity: overlayOpacity }
  const heroStyle = shouldReduceMotion ? undefined : { opacity: heroOpacity, scale: heroScale }
  const slabStyle = shouldReduceMotion ? undefined : { y: slabY }

  return (
    <article className="min-h-screen bg-surface-deep text-white">
      <section ref={revealRef} className="relative min-h-[220svh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden border-b border-white/10 bg-surface-base">
          <motion.div style={mediaStyle} className="absolute inset-0 scale-[1.06]">
            {post.coverImage.url ? (
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt || post.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            ) : (
              <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(135,182,255,0.2),transparent_45%),linear-gradient(180deg,#111_0%,#050505_100%)]" />
            )}
          </motion.div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(133,92,248,0.2),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.5)_100%)]" />
          <motion.div style={overlayStyle} className="absolute inset-0 bg-black" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[44svh] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.46)_34%,#050505_100%)]" />

          <div className="relative flex h-full items-end px-5 pb-[24svh] md:px-10 lg:px-[6vw] lg:pb-[25svh] xl:px-[7vw]">
            <motion.div style={heroStyle} className="w-full origin-bottom-left">
              <div className="max-w-[74rem]">
                <h1 className="max-w-[10.5ch] pt-6 font-[family-name:var(--font-satoshi)] text-[3.8rem] font-bold leading-[0.84] tracking-[-0.05em] text-white sm:text-[5.1rem] lg:text-[6.2rem] xl:text-[7rem]">
                  {post.title}
                </h1>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative z-20 -mt-[24svh] px-5 pb-[18svh] md:px-10 lg:px-[6vw] lg:pb-[22svh] xl:px-[7vw]">
          <motion.div style={slabStyle} className="will-change-transform">
            <PressArticleSlab
              post={post}
              className="bg-[linear-gradient(180deg,#0d0d12_0%,#07070a_100%)] shadow-[0_24px_72px_rgba(0,0,0,0.66),0_0_0_1px_rgba(255,255,255,0.04),0_0_110px_rgba(111,76,255,0.14)]"
            />
          </motion.div>
        </div>
      </section>
    </article>
  )
}
