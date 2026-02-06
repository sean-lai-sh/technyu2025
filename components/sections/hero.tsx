'use client'
import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { MaskText } from '../inlinemask/inline-mask';
import { MaskSVG } from '../inlinemask/inline-image-mask';
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';
import Logo from '@/components/assets/logo.svg'

gsap.registerPlugin(CustomEase);

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    
    if (!video || !container) return;

    let hasAnimated = false;

    const handleTimeUpdate = () => {
      // Trigger animation when 3 seconds remain
      const timeRemaining = video.duration - video.currentTime;
      
      if (timeRemaining <= 22 && !hasAnimated) {
        hasAnimated = true;
        
        // Calculate responsive scale based on viewport width to match navbar proportions
        // Navbar: w-[90svw] md:w-[85svw] lg:w-[95svw]
        // Use actual svw units to account for scrollbar presence
        const viewportWidth = window.innerWidth;
        let targetWidth = '90svw'; // default
        let targetY = '10vh';
        if (viewportWidth >= 1024) {
          targetWidth = '90svw'; // lg breakpoint
          targetY = '20vh';
        } else if (viewportWidth >= 768) {
          targetWidth = '85svw'; // md breakpoint
          targetY = '12vh';
        }
        
        // Create GSAP timeline for smooth, synchronized animation
        const tl = gsap.timeline({
          defaults: { duration: 1.8, ease: 'power2.inOut' }
        });

        tl.to(container, {
          width: targetWidth,
          y: targetY,
          boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.3), 0 20px 40px -15px rgba(255, 255, 255, 0.15), 0 10px 20px -8px rgba(255, 255, 255, 0.1)",
          borderRadius: "24px",
        });
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <section className="relative w-[100svw] h-[100svh] overflow-visible aspect-video flex items-center justify-center bg-black">
      {/* Video container with animation target */}
      <div 
        ref={containerRef}
        className="relative w-[100svw] h-[100svh] overflow-hidden z-[30]"
        style={{ transformOrigin: 'center top' }}
      >
        {/* Full screen video */}
        <video 
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover aspect-video"
          playsInline
          autoPlay
          muted
          preload="auto"
        >
          <source src="/hero_vp9.webm" type="video/webm" />
        </video>
        
        {/* Dark overlay to make text more readable */}
        <div className="absolute inset-0 w-full h-full bg-black opacity-50"></div>
        
        {/* Bottom-right aligned content with padding */}
        <div className="relative z-1 flex flex-col items-start justify-end w-full h-full text-white p-5 md:p-10 lg:py-12 lg:px-[2.5%]">
          <div className="w-full">
            {/* SVG Logo with mask animation */}
            <div className="mb-[1.5%] md:mb-3 lg:mb-1">
              <MaskSVG
                customDelay={0.75}
                duration={1.7}
                className="w-[70svw] sm:w-[60svw] md:w-[55svw] lg:w-[30svw]"
              >
                <Logo 
                  alt="Tech@NYU" 
                  className="w-full h-auto"
                />
              </MaskSVG>
            </div>
            <div className="text-2xl sm:text-4xl md:text-4xl lg:text-[2.25vw] text-left font-satoshi tracking-tight">
              <MaskText 
                phrases={['The Space for Artists, Makers, and Hackers to Build @ NYU']} 
                customDelay={0.75} 
                duration={1.5}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
