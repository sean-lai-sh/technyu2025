import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { MaskText } from '../inlinemask/inline-mask';
import { MaskSVG } from '../inlinemask/inline-image-mask';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import CustomEase from 'gsap/CustomEase';
import Logo from '@/components/assets/logo.svg'
import { motion } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';

gsap.registerPlugin(CustomEase, SplitText);

// Create a named CustomEase using a cubic bezier path and register it.
// Use the registered name ('customEase') when supplying the ease to animations.
CustomEase.create("customEase", "M0,0 C0.65,0 0.35,1 1,1");
const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const headline = headlineRef.current;
    
    if (!headline) return;

    // Split text into lines
    const split = new SplitText(headline, { type: 'lines' });
    
    // Wrap each line for animation
    gsap.set(split.lines, { 
      yPercent: 100,
      opacity: 0
    });

    // Set the headline visible now that lines are positioned
    gsap.set(headline, { opacity: 1 });

    // Animate lines in sequence
    gsap.to(split.lines, {
      yPercent: 0,
      opacity: 1,
      duration: 1.25,
      stagger: 0.05,
      delay: 0.75,
      // reference the named CustomEase registered above
      ease: "customEase"
    });

    return () => {
      split.revert();
    };
  }, []);

  // useEffect(() => {
  //   const video = videoRef.current;
  //   const container = containerRef.current;
    
  //   if (!video || !container) return;

  //   let hasAnimated = false;

  //   const handleTimeUpdate = () => {
  //     // Trigger animation when 3 seconds remain
  //     const timeRemaining = video.duration - video.currentTime;
      
  //     if (timeRemaining <= 22 && !hasAnimated) {
  //       hasAnimated = true;
        
  //       // Calculate responsive scale based on viewport width to match navbar proportions
  //       // Navbar: w-[90svw] md:w-[85svw] lg:w-[95svw]
  //       // Use actual svw units to account for scrollbar presence
  //       const viewportWidth = window.innerWidth;
  //       let targetWidth = '90svw'; // default
  //       let targetY = '10vh';
  //       if (viewportWidth >= 1024) {
  //         targetWidth = '90svw'; // lg breakpoint
  //         targetY = '20vh';
  //       } else if (viewportWidth >= 768) {
  //         targetWidth = '85svw'; // md breakpoint
  //         targetY = '12vh';
  //       }
        
  //       // Create GSAP timeline for smooth, synchronized animation
  //       const tl = gsap.timeline({
  //         defaults: { duration: 1.8, ease: 'power2.inOut' }
  //       });

  //       tl.to(container, {
  //         width: targetWidth,
  //         y: targetY,
  //         boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.3), 0 20px 40px -15px rgba(255, 255, 255, 0.15), 0 10px 20px -8px rgba(255, 255, 255, 0.1)",
  //         borderRadius: "24px",
  //       });
  //     }
  //   };

  //   video.addEventListener('timeupdate', handleTimeUpdate);

  //   return () => {
  //     video.removeEventListener('timeupdate', handleTimeUpdate);
  //   };
  // }, []);

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
        
        {/* Bottom aligned content with padding */}
        <div className="relative z-1 flex flex-col items-start justify-end w-full h-full text-white p-5 md:p-10 lg:py-12 lg:px-[5%]">
          <div className="w-full max-w-[1600px] flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 lg:gap-12">
            {/* Left side: Logo + Text */}
            <div className="flex flex-col">
              {/* Large bold headline similar to BCV */}
              <div className="mb-4 md:mb-6 lg:mb-8 overflow-hidden">
                <h1 
                  ref={headlineRef}
                  className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-bold leading-[0.8] tracking-tight opacity-0"
                >
                  Build Fast,<br />Learn Faster
                </h1>
              </div>
              
              {/* Supporting text - more refined like BCV's subtitle */}
              <div className="max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[70%]">
                <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light tracking-tight leading-[1.2]">
                  <MaskText 
                    phrases={['The Space for Designers, Makers, and Hackers to Build at NYU. No matter where you start, we will help you build your dreams one line at a time.']} 
                    customDelay={0.75} 
                    duration={1.25}
                  />
                </div>
              </div>
            </div>
            
            {/* Right side: CTA Button - BCV style */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.25, delay: 0.75, ease: [0.65, 0, 0.35, 1] }}
              className="lg:flex-shrink-0"
            >
              <a
                href="https://discord.gg/4dZWP9MXNc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 text-base md:text-lg font-medium text-white border border-white/30 rounded-none hover:bg-white hover:text-black transition-all duration-300 ease-in group"
              >
                <span>Join the Club</span>
                <ArrowRightIcon/>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
