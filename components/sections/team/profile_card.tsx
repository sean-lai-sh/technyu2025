
import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { TeamMember } from '@/lib/types'
import { gsap } from 'gsap'
import { ArrowUpRight } from 'lucide-react'

const ProfileCard = ({ member, priority }: { member: TeamMember, priority?: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const fadeImageRef = useRef<HTMLImageElement>(null)
  const linkedinRef = useRef<HTMLDivElement>(null)
  const greenShadowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const content = contentRef.current
    const image = imageRef.current
    const fadeImage = fadeImageRef.current
    const linkedin = linkedinRef.current
    const greenShadow = greenShadowRef.current

    if (!card || !content || !image || !greenShadow) return

    // Create a timeline instance scoped to this component
    let enterTimeline: gsap.core.Timeline | null = null
    let exitTimeline: gsap.core.Timeline | null = null

    // Set initial states for this specific card's elements - green shadow replaces black overlay
    gsap.set(greenShadow, { 
      scaleY: 0,
      transformOrigin: "bottom",
      opacity: 0
    })
    
    // Set initial state for fade image if it exists
    if (fadeImage && member.fadeIn) {
      gsap.set(fadeImage, { opacity: 0 })
    }
    
    // Position content so LinkedIn is initially hidden below the card
    gsap.set(content, { y: linkedin ? 45 : 0 })

    // Hover enter animation - scoped to this card's elements only
    const handleMouseEnter = () => {
      // Kill any existing animations on this card's elements
      if (exitTimeline) exitTimeline.kill()
      
      enterTimeline = gsap.timeline()
      
      enterTimeline.to(image, { scale: 1.1, duration: 0.4, ease: "power2.out" }, 0)
        .to(greenShadow, { 
          scaleY: 1,
          opacity: 1, 
          duration: 0.4, 
          ease: "power2.out" 
        }, 0)
        .to(content, {
          y: linkedin ? -10 : -25,
          duration: 0.3,
          ease: "power2.out"
        }, 0)
      
      // Fade in the second image if it exists
      if (fadeImage && member.fadeIn) {
        enterTimeline.to(fadeImage, {
          opacity: 1,
          duration: 0.6,
          delay:0.2,
          ease: "power2.out"
        }, 0)
      }
    }

    // Hover exit animation - scoped to this card's elements only
    const handleMouseLeave = () => {
      // Kill any existing animations on this card's elements
      if (enterTimeline) enterTimeline.kill()
      
      exitTimeline = gsap.timeline()
      
      exitTimeline.to(image, { 
          scale: 1, 
          duration: 0.4, 
          ease: "power2.out" 
        }, 0)
        .to(content, {
          y: linkedin ? 45 : 0,
          duration: 0.3,
          ease: "power2.out"
        }, 0)
        .to(greenShadow, { 
          scaleY: 0,
          opacity: 0, 
          duration: 0.3, 
          ease: "power2.in" 
        }, 0)
      
      // Fade out the second image if it exists
      if (fadeImage && member.fadeIn) {
        exitTimeline.to(fadeImage, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        }, 0)
      }

    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      // Clean up event listeners and kill any running animations for this card
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
      
      if (enterTimeline) enterTimeline.kill()
      if (exitTimeline) exitTimeline.kill()
    }
  }, [member.fadeIn])

  return (
    <div 
      ref={cardRef} 
      className="relative group overflow-hidden border border-border cursor-pointer block min-h-[300px] sm:min-h-[325px] lg:min-h-[350px] aspect-[4/5] lg:max-h-[500px]"
    >
      <a
        href={`/team/${member.slug}`}
        className="absolute inset-0 z-10 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-inset"
        aria-label={`Learn more about ${member.name}`}
      />
        <Image
          ref={imageRef}
          src={member.imageUrl}
          alt={member.name}
          width={392}
          height={694}
          className="w-full h-full object-cover"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
        {/* Fade in image that appears on hover */}
        {member.fadeIn && (
          <Image
            ref={fadeImageRef}
            src={member.fadeIn}
            alt={`${member.name} hover`}
            width={392}
            height={694}
            className="absolute inset-0 w-full h-full object-cover opacity-0"
            loading="lazy"
          />
        )}
    {/* Permanent text background for readability */}
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent h-32"></div>
    {/* Green shadow effect that appears on hover - layered on top */}
    <div 
      ref={greenShadowRef}
      style={{ boxShadow: 'inset 0px 0px 100px rgba(77, 255, 148, 0.4)' }}
      className="absolute inset-0 bg-gradient-to-t from-green-700/60 via-green-500/10 to-green-400/10" 
    ></div>
    <div ref={contentRef} className="absolute bottom-0 left-0 right-0 p-6 text-white z-10 group">
      <div>
        <h5 className="text-heading-1 text-white">{member.name}</h5>
        <p className="text-base font-normal">{member.title}</p>
        
        {/* LinkedIn link that appears on hover */}
        {member.linkedinUrl && (
          <div ref={linkedinRef} className="mt-3">
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation()
              }}
              className="relative z-30 bg-transparent inline-flex items-center gap-2 text-sm text-white hover:opacity-80 transition-opacity underline underline-offset-4 py-1"
              aria-label={`${member.name}'s LinkedIn profile`}
            >
              <span>LinkedIn</span>
                <ArrowUpRight size={16} />
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
  )
}

export default ProfileCard
