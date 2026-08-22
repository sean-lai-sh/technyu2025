'use client'
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { motionTokens } from '@/lib/motion'

const Anim_Button = ({
  content,
  style = '',
  href = '/',
  funcAct
}: {
  content: string
  style?: string
  href: string
  funcAct: () => void
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const bg = backgroundRef.current
    if (!container || !bg) return

    const enter = () => {
      funcAct?.()
      gsap.killTweensOf(bg)
      gsap.to(bg, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: motionTokens.hoverInDurationMs / 1000,
        ease: motionTokens.brandEnterEaseCss,
      })
    }

    const exit = () => {
      gsap.killTweensOf(bg)
      gsap.to(bg, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: motionTokens.hoverOutDurationMs / 1000,
        ease: motionTokens.brandExitEaseCss,
        onComplete: () => {
          gsap.set(bg, { clipPath: 'inset(100% 0% 0% 0%)' })
        },
      })
    }

    container.addEventListener('mouseenter', enter)
    container.addEventListener('mouseleave', exit)
    return () => {
      container.removeEventListener('mouseenter', enter)
      container.removeEventListener('mouseleave', exit)
    }
  }, [funcAct])

  return (
    <Link href={href} passHref className="w-fit">
      <div
        ref={containerRef}
        className={`
          relative flex justify-center items-center
          font-semibold text-white overflow-hidden cursor-pointer
          hover:text-black ${style}
          rounded-2xl border-[2px] border-offwhite

          /* small: mobile */
          px-4 py-2

          /* medium: tablets */
          md:px-10 md:py-3

          /* large: desktop */
          lg:px-20 lg:py-4
        `}
      >
        {/* Background Layer */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 w-full h-full bg-offwhite z-0"
          style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        />

        {/* Foreground content */}
        <div className="relative flex z-10 items-center h-full">
          {content}
        </div>
      </div>
    </Link>
  )
}

export default Anim_Button
