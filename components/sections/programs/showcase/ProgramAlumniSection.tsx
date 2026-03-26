'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { Testimonial } from './types'

type ProgramAlumniSectionProps = {
  testimonials: Testimonial[]
}

const AUTOPLAY_MS = 7000
const PROGRESS_TICK_MS = 50

const testimonialMotionVariants: Variants = {
  enter: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction > 0 ? 20 : -20,
    filter: 'blur(8px)',
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction > 0 ? -14 : 14,
    filter: 'blur(6px)',
    transition: { duration: 0.28, ease: [0.4, 0, 1, 1] },
  }),
}

export default function ProgramAlumniSection({ testimonials }: ProgramAlumniSectionProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [testimonialProgress, setTestimonialProgress] = useState(0)
  const [transitionDirection, setTransitionDirection] = useState<1 | -1>(1)
  const touchStartX = useRef(0)

  const testimonialCount = testimonials.length
  const activeTestimonialData = testimonials[activeTestimonial] ?? testimonials[0] ?? {
    id: 'fallback',
    company: '',
    quote: '',
    name: '',
    title: '',
    cohort: '',
  }

  useEffect(() => {
    setActiveTestimonial(0)
    setTestimonialProgress(0)
  }, [testimonialCount])

  useEffect(() => {
    if (testimonialCount <= 1) {
      setTestimonialProgress(0)
      return
    }

    setTestimonialProgress(0)
    const startedAt = window.performance.now()

    const progressInterval = window.setInterval(() => {
      const elapsed = window.performance.now() - startedAt
      const nextProgress = Math.min((elapsed / AUTOPLAY_MS) * 100, 100)
      setTestimonialProgress(nextProgress)
    }, PROGRESS_TICK_MS)

    const advanceTimeout = window.setTimeout(() => {
      setTransitionDirection(1)
      setActiveTestimonial((current) => (current + 1) % testimonialCount)
      setTestimonialProgress(0)
    }, AUTOPLAY_MS)

    return () => {
      window.clearInterval(progressInterval)
      window.clearTimeout(advanceTimeout)
    }
  }, [activeTestimonial, testimonialCount])

  const selectTestimonial = useCallback((index: number) => {
    if (index === activeTestimonial) return
    const isForward = index > activeTestimonial || (activeTestimonial === testimonialCount - 1 && index === 0)
    setTransitionDirection(isForward ? 1 : -1)
    setActiveTestimonial(index)
    setTestimonialProgress(0)
  }, [activeTestimonial, testimonialCount])

  const cycleTestimonial = useCallback((direction: 'next' | 'prev') => {
    if (testimonialCount <= 1) {
      setActiveTestimonial(0)
      setTestimonialProgress(0)
      return
    }

    setTransitionDirection(direction === 'next' ? 1 : -1)
    setActiveTestimonial((current) => {
      if (direction === 'next') return (current + 1) % testimonialCount
      return (current - 1 + testimonialCount) % testimonialCount
    })
    setTestimonialProgress(0)
  }, [testimonialCount])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) cycleTestimonial('next')
      else cycleTestimonial('prev')
    }
  }, [cycleTestimonial])

  return (
    <section className="px-[5vw] lg:px-[8vw] py-[10svh] border-t border-[#EDEDED]/8">
      <div className="flex items-center gap-3 mb-12">
        <span className="inline-block w-3 h-3 bg-[#B300FF]" aria-hidden="true" />
        <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.15em] uppercase opacity-55">
          ALUMNI
        </p>
      </div>
      <div className="flex gap-8 mb-12 border-b border-[#EDEDED]/12 overflow-x-auto">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            onClick={() => selectTestimonial(i)}
            className={`relative font-[family-name:var(--font-inter)] text-[14px] font-medium pb-4 border-b-2 whitespace-nowrap transition-all duration-300 ${
              activeTestimonial === i
                ? 'text-[#EDEDED] border-[#4DFF94]'
                : 'text-[#EDEDED]/38 border-transparent hover:text-[#EDEDED]/65'
            }`}
          >
            {t.company}
            <span className="pointer-events-none absolute left-0 right-0 -bottom-[2px] h-[2px] bg-[#EDEDED]/12 overflow-hidden">
              <span
                className="block h-full bg-[#4DFF94] transition-[width] duration-75 ease-linear"
                style={{ width: activeTestimonial === i ? `${testimonialProgress}%` : '0%' }}
              />
            </span>
          </button>
        ))}
      </div>

      <div className="w-[60svw]" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="flex items-center gap-4 md:gap-8">
          <button
            type="button"
            onClick={() => cycleTestimonial('prev')}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#EDEDED]/28 text-[#EDEDED]/75 hover:text-[#EDEDED] hover:border-[#EDEDED]/58 transition-colors flex items-center justify-center shrink-0"
            aria-label="Previous testimonial"
          >
            <span aria-hidden="true" className="text-base leading-none">‹</span>
          </button>
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTestimonialData.id}
                custom={transitionDirection}
                variants={testimonialMotionVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <blockquote
                  className="font-[family-name:var(--font-darker-grotesque)] italic text-[#EDEDED] leading-[1.15] mb-8"
                  style={{ fontSize: 'clamp(22px, 3.4vw, 40px)' }}
                >
                  {activeTestimonialData.quote}
                </blockquote>
                <div>
                  <p className="font-[family-name:var(--font-inter)] font-semibold text-[15px] text-[#EDEDED]">
                    {activeTestimonialData.name}
                  </p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#EDEDED] opacity-45 mt-1">
                    {activeTestimonialData.title} · Cohort {activeTestimonialData.cohort}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            type="button"
            onClick={() => cycleTestimonial('next')}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#EDEDED]/28 text-[#EDEDED]/75 hover:text-[#EDEDED] hover:border-[#EDEDED]/58 transition-colors flex items-center justify-center shrink-0"
            aria-label="Next testimonial"
          >
            <span aria-hidden="true" className="text-base leading-none">›</span>
          </button>
        </div>
      </div>

      <div className="mt-10">
        
        <div className="flex gap-2">
          {testimonials.map((_, i) => {
            const progressWidth = i < activeTestimonial ? 100 : i === activeTestimonial ? testimonialProgress : 0
            return (
              <button
                key={i}
                onClick={() => selectTestimonial(i)}
                className="relative h-1.5 flex-1 min-w-[42px] rounded-full bg-[#EDEDED]/14 overflow-hidden"
                aria-label={`Testimonial ${i + 1}`}
              >
                <span
                  className="absolute inset-y-0 left-0 bg-[#4DFF94] transition-[width] duration-75 ease-linear"
                  style={{ width: `${progressWidth}%` }}
                />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
