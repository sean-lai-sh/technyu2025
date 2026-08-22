'use client'
import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface TwoColumnSectionProps {
  title: string
  description: React.ReactNode
  image?: string
  flip?: boolean
  last?: boolean
}

const TwoColumnSection = ({ title, description, image, flip, last }: TwoColumnSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const topBorderRef = useRef<HTMLSpanElement>(null)
  const sideBorderRef = useRef<HTMLSpanElement>(null)
  const bottomBorderRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!containerRef.current || !topBorderRef.current || !sideBorderRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',    // starts when 25% into viewport
        end: 'top 37.5%',      // ends when container top reaches 35% from viewport top
        scrub: true,
      }
    })

    // Top border: animates towards the side border (left-to-right when !flip, right-to-left when flip)
    const topOrigin = flip ? 'right center' : 'left center'
    tl.fromTo(topBorderRef.current,
      { scaleX: 0, transformOrigin: topOrigin },
      { scaleX: 0.25, duration: 0.1, ease: 'power3.out' }  // fast burst with smooth decel
    )
    .to(topBorderRef.current,
      { scaleX: 1, duration: 0.35, ease: 'power1.inOut' }  // smooth glide to finish
    )

    // Side border: similar pattern with smooth motion
    .fromTo(sideBorderRef.current,
      { scaleY: 0, transformOrigin: 'top center' },
      { scaleY: 0.25, duration: 0.05, ease: 'power3.out' }  // fast burst with smooth decel
    )
    .to(sideBorderRef.current,
      { scaleY: 1.001, duration: 0.55, ease: 'power1.inOut' }  // smooth glide down
    )

    // Bottom border if last: animates away from the side border (completing the frame)
    if (last && bottomBorderRef.current) {
      const bottomOrigin = flip ? 'left center' : 'right center'
      tl.fromTo(bottomBorderRef.current,
        { scaleX: 0, transformOrigin: bottomOrigin },
        { scaleX: 1, duration: 0.2, ease: 'power2.inOut' }
      )
    }

    return () => {
      tl.kill()
    }
  }, [last, flip])

  return (
    <div ref={containerRef} className='relative lg:grid lg:grid-cols-2 lg:border-1 lg:border-gray-500/20 border-t-[1px] border-gray-500/80'>
      {/* Top border */}
      <span ref={topBorderRef} className='hidden lg:block absolute top-0 left-0 w-full h-[1px] z-10 bg-white scale-x-0' />
      {/* Side border: left when flip, right when not */}
      <span ref={sideBorderRef} className={`hidden lg:block absolute top-0 w-[1px] h-full z-10 bg-white scale-y-0 ${flip ? 'left-0' : 'right-[-1px]'}`} />
      {/* Bottom border */}
      {last && <span ref={bottomBorderRef} className='hidden lg:block absolute bottom-0 left-0 w-full h-[1px] z-10 bg-white scale-x-0' />}
      <div className={`py-5 lg:p-[4rem] xl:p-[6rem] ${flip ? 'lg:order-2 lg:border-l border-white/20' : 'lg:border-r border-white/20'}`}>
        <h2 className='text-4xl lg:text-5xl font-bold'>{title}</h2>
        <br/>
        <br/>
        <div className='text-lg'>{description}</div>
      </div>
      <div className='w-full h-full items-center flex justify-center'>
      <div className={`w-full h-full lg:py-0 xl:mx-[6rem] bg-amber-200 relative overflow-hidden ${flip ? 'lg:order-1' : ''}`}>
        {image && (
          <img src={image} className="w-full h-auto object-contain" />
        )}
      </div>
      </div>
    </div>
  )
}

export default TwoColumnSection
