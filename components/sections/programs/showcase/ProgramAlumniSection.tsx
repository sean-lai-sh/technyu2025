'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, Variants } from 'framer-motion'
import { motionTokens } from '@/lib/motion'
import { Testimonial } from './types'

type ProgramAlumniSectionProps = {
  testimonials: Testimonial[]
}

const AUTOPLAY_MS = 7000
const PROGRESS_TICK_MS = 50

const createTestimonialMotionVariants = (reduceMotion: boolean): Variants => ({
  enter: (direction: 1 | -1) => ({
    opacity: 0,
    x: reduceMotion ? 0 : direction > 0 ? 20 : -20,
    filter: reduceMotion ? 'blur(0px)' : 'blur(8px)',
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: reduceMotion ? 0.16 : motionTokens.enterDurationMs / 1000,
      ease: motionTokens.brandEnterEase,
    },
  },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    x: reduceMotion ? 0 : direction > 0 ? -14 : 14,
    filter: reduceMotion ? 'blur(0px)' : 'blur(6px)',
    transition: {
      duration: reduceMotion ? 0.12 : motionTokens.exitDurationMs / 1000,
      ease: motionTokens.brandExitEase,
    },
  }),
})

export default function ProgramAlumniSection({ testimonials }: ProgramAlumniSectionProps) {
  const shouldReduceMotion = useReducedMotion()
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [testimonialProgress, setTestimonialProgress] = useState(0)
  const [recentlyCompletedTestimonial, setRecentlyCompletedTestimonial] = useState<number | null>(null)
  const [transitionDirection, setTransitionDirection] = useState<1 | -1>(1)
  const touchStartX = useRef(0)
  const testimonialMotionVariants = useMemo(
    () => createTestimonialMotionVariants(Boolean(shouldReduceMotion)),
    [shouldReduceMotion],
  )

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
    setRecentlyCompletedTestimonial(null)
  }, [testimonialCount])

  useEffect(() => {
    if (recentlyCompletedTestimonial === null) return
    const drainDelay = shouldReduceMotion ? 0 : motionTokens.progressDrainDelayMs
    const clearTimer = window.setTimeout(() => {
      setRecentlyCompletedTestimonial(null)
    }, drainDelay)
    return () => clearTimeout(clearTimer)
  }, [recentlyCompletedTestimonial, shouldReduceMotion])

  useEffect(() => {
    if (testimonialCount <= 1) {
      setTestimonialProgress(0)
      return
    }

    setTestimonialProgress(0)
    if (shouldReduceMotion) {
      setTestimonialProgress(100)
      const advanceTimeout = window.setTimeout(() => {
        setTransitionDirection(1)
        setTestimonialProgress(100)
        setActiveTestimonial((current) => (current + 1) % testimonialCount)
        setRecentlyCompletedTestimonial(activeTestimonial)
      }, AUTOPLAY_MS)
      return () => window.clearTimeout(advanceTimeout)
    }

    const startedAt = window.performance.now()

    const progressInterval = window.setInterval(() => {
      const elapsed = window.performance.now() - startedAt
      const nextProgress = Math.min((elapsed / AUTOPLAY_MS) * 100, 100)
      setTestimonialProgress(nextProgress)
    }, PROGRESS_TICK_MS)

    const advanceTimeout = window.setTimeout(() => {
      setTransitionDirection(1)
      setTestimonialProgress(0)
      setActiveTestimonial((current) => (current + 1) % testimonialCount)
      setRecentlyCompletedTestimonial(activeTestimonial)
    }, AUTOPLAY_MS)

    return () => {
      window.clearInterval(progressInterval)
      window.clearTimeout(advanceTimeout)
    }
  }, [activeTestimonial, shouldReduceMotion, testimonialCount])

  const selectTestimonial = useCallback((index: number) => {
    if (index === activeTestimonial) return
    const isForward = index > activeTestimonial || (activeTestimonial === testimonialCount - 1 && index === 0)
    setTransitionDirection(isForward ? 1 : -1)
    setRecentlyCompletedTestimonial(activeTestimonial)
    setTestimonialProgress(0)
    setActiveTestimonial(index)
  }, [activeTestimonial, testimonialCount])

  const cycleTestimonial = useCallback((direction: 'next' | 'prev') => {
    if (testimonialCount <= 1) {
      setActiveTestimonial(0)
      setTestimonialProgress(0)
      return
    }

    setTransitionDirection(direction === 'next' ? 1 : -1)
    setRecentlyCompletedTestimonial(activeTestimonial)
    setTestimonialProgress(0)
    setActiveTestimonial((current) => {
      if (direction === 'next') return (current + 1) % testimonialCount
      return (current - 1 + testimonialCount) % testimonialCount
    })
  }, [activeTestimonial, testimonialCount])

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
    <section className="px-[5vw] lg:px-[8vw] py-[10svh] border-t border-white/10">
      <div className="flex items-center gap-3 mb-12">
        <p className="font-[family-name:var(--font-inter)] text-[12px] font-semibold tracking-[0.22em] uppercase text-white/48">
          ALUMNI
        </p>
      </div>
      <div className="flex gap-8 mb-12 border-b border-white/10 overflow-x-auto">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            onClick={() => selectTestimonial(i)}
            className={`relative font-[family-name:var(--font-inter)] text-[14px] font-medium pb-5 whitespace-nowrap transition-colors ${
              activeTestimonial === i
                ? 'text-white'
                : 'text-white/48 hover:text-white/72'
            }`}
            style={{
              transitionDuration: `${motionTokens.hoverInDurationMs}ms`,
              transitionTimingFunction: motionTokens.brandEnterEaseCss,
            }}
          >
            {t.company}
            <span className="pointer-events-none absolute left-0 right-0 bottom-[1px] h-[3px] rounded-full bg-white/10 overflow-hidden">
              <motion.span
                initial={false}
                className="absolute inset-y-0 left-0 right-0 bg-[#4DFF94]/90"
                style={{ transformOrigin: 'right center' }}
                animate={{ scaleX: recentlyCompletedTestimonial === i && activeTestimonial !== i ? 1 : 0 }}
                transition={{
                  duration: shouldReduceMotion
                    ? 0.08
                    : recentlyCompletedTestimonial === i && activeTestimonial !== i
                    ? 0
                    : motionTokens.progressDrainDurationMs / 1000,
                  ease: motionTokens.brandExitEase,
                }}
              />
              <span
                className="absolute inset-y-0 left-0 block h-full bg-[#4DFF94] transition-[width] ease-linear"
                style={{
                  width: `${i === activeTestimonial ? testimonialProgress : 0}%`,
                  transitionDuration: shouldReduceMotion ? '0ms' : `${PROGRESS_TICK_MS + 25}ms`,
                }}
              />
            </span>
          </button>
        ))}
      </div>

      <div className="w-full max-w-[60svw]" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="flex items-center gap-4 md:gap-8">
          <button
            type="button"
            onClick={() => cycleTestimonial('prev')}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/10 text-white/72 hover:text-white hover:border-white/20 transition-colors [transition-duration:var(--motion-hover-in-duration)] [transition-timing-function:var(--motion-brand-enter)] flex items-center justify-center shrink-0"
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
                <blockquote className="text-display-3 italic text-white mb-8">
                  {activeTestimonialData.quote}
                </blockquote>
                <div>
                  <p className="font-[family-name:var(--font-inter)] font-semibold text-[15px] text-white">
                    {activeTestimonialData.name}
                  </p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/48 mt-1">
                    {activeTestimonialData.title} · Cohort {activeTestimonialData.cohort}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            type="button"
            onClick={() => cycleTestimonial('next')}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-white/10 text-white/72 hover:text-white hover:border-white/20 transition-colors [transition-duration:var(--motion-hover-in-duration)] [transition-timing-function:var(--motion-brand-enter)] flex items-center justify-center shrink-0"
            aria-label="Next testimonial"
          >
            <span aria-hidden="true" className="text-base leading-none">›</span>
          </button>
        </div>
      </div>
    </section>
  )
}
