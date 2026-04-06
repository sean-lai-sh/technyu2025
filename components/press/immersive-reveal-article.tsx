'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { PressPost } from '@/lib/types'
import { PressArticleMeta, PressArticleSlab } from './press-article-slab'

export default function ImmersiveRevealArticle({ post }: { post: PressPost }) {
  const slabRef = useRef<HTMLDivElement | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: slabRef,
    offset: ['start end', 'start start'],
  })

  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '-7%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0.18, 0.58, 1])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.68, 1], [1, 0.62, 0])
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const slabY = useTransform(scrollYProgress, [0, 1], ['72px', '0px'])
  const slabOpacity = useTransform(scrollYProgress, [0, 0.4], [0.72, 1])

  const mediaStyle = shouldReduceMotion ? undefined : { y: mediaY }
  const overlayStyle = shouldReduceMotion ? undefined : { opacity: overlayOpacity }
  const heroStyle = shouldReduceMotion ? undefined : { opacity: heroOpacity, y: heroY }
  const slabStyle = shouldReduceMotion ? undefined : { y: slabY, opacity: slabOpacity }

  return (
    <article className="min-h-screen bg-[#050505] text-white">
      <section className="relative h-[168svh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden border-b border-white/8 bg-[#030303]">
          <motion.div style={mediaStyle} className="absolute inset-0 scale-[1.08]">
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

          <div className="relative flex h-full items-end px-5 pb-[16svh] md:px-10 lg:px-[4vw] lg:pb-[18svh]">
            <motion.div style={heroStyle} className="w-full">
              <div className="max-w-[88rem]">
                <PressArticleMeta post={post} />
                <h1 className="max-w-[12ch] pt-6 font-[family-name:var(--font-darker-grotesque)] text-[3.8rem] font-bold leading-[0.82] tracking-[-0.055em] text-white sm:text-[5.4rem] lg:text-[7.3rem] xl:text-[8.4rem]">
                  {post.title}
                </h1>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34svh] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_34%,#050505_100%)]" />
      </section>

      <section className="relative z-10 -mt-[30svh] px-5 pb-24 md:px-10 lg:px-[4vw] lg:pb-28">
        <motion.div
          ref={slabRef}
          style={slabStyle}
          className="will-change-transform"
        >
          <PressArticleSlab post={post} />
        </motion.div>
      </section>
    </article>
  )
}
