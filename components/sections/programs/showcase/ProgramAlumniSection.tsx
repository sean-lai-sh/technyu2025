'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Testimonial } from './types'

type ProgramAlumniSectionProps = {
  testimonials: Testimonial[]
}

const AUTOPLAY_MS = 7000
const PROGRESS_TICK_MS = 70

export default function ProgramAlumniSection({ testimonials }: ProgramAlumniSectionProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [testimonialProgress, setTestimonialProgress] = useState(0)
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
    const step = (PROGRESS_TICK_MS / AUTOPLAY_MS) * 100
    const interval = window.setInterval(() => {
      setTestimonialProgress((prev) => {
        const next = prev + step
        if (next >= 100) {
          setActiveTestimonial((current) => (current + 1) % testimonialCount)
          return 0
        }
        return next
      })
    }, PROGRESS_TICK_MS)
    return () => window.clearInterval(interval)
  }, [testimonialCount])

  const selectTestimonial = useCallback((index: number) => {
    setActiveTestimonial(index)
    setTestimonialProgress(0)
  }, [])

  const cycleTestimonial = useCallback((direction: 'next' | 'prev') => {
    if (testimonialCount <= 1) {
      setActiveTestimonial(0)
      setTestimonialProgress(0)
      return
    }
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

      <div className="max-w-[980px]" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="flex items-start gap-4 md:gap-8">
          <button
            type="button"
            onClick={() => cycleTestimonial('prev')}
            className="mt-2 w-9 h-9 md:w-10 md:h-10 rounded-full border border-[#EDEDED]/28 text-[#EDEDED]/75 hover:text-[#EDEDED] hover:border-[#EDEDED]/58 transition-colors flex items-center justify-center shrink-0"
            aria-label="Previous testimonial"
          >
            <span aria-hidden="true" className="text-base leading-none">‹</span>
          </button>
          <div className="flex-1 min-w-0">
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
          </div>
          <button
            type="button"
            onClick={() => cycleTestimonial('next')}
            className="mt-2 w-9 h-9 md:w-10 md:h-10 rounded-full border border-[#EDEDED]/28 text-[#EDEDED]/75 hover:text-[#EDEDED] hover:border-[#EDEDED]/58 transition-colors flex items-center justify-center shrink-0"
            aria-label="Next testimonial"
          >
            <span aria-hidden="true" className="text-base leading-none">›</span>
          </button>
        </div>
      </div>

      <div className="flex gap-2 mt-8">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => selectTestimonial(i)}
            className={`h-0.5 transition-all duration-300 ${activeTestimonial === i ? 'w-8 bg-[#4DFF94]' : 'w-4 bg-[#EDEDED]/18'}`}
            aria-label={`Testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
