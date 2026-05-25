'use client'
import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import CustomEase from 'gsap/CustomEase';
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
  const supportingTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headline = headlineRef.current;
    const supportingText = supportingTextRef.current;

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

    // Animate supporting text lines
    if (supportingText) {
      const lineSplit = new SplitText(supportingText, { type: 'words' });

      gsap.set(lineSplit.words, {
        opacity: 0,
        yPercent: 100
      });

      gsap.set(supportingText, { opacity: 1 });

      gsap.to(lineSplit.words, {
        opacity: 1,
        yPercent: 0,
        duration: 1.25,
        stagger: 0,
        delay: 1.20,
        ease: "customEase"
      });

      return () => {
        split.revert();
        lineSplit.revert();
      };
    }

    return () => {
      split.revert();
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
        
        {/* Bottom aligned content with padding */}
        <div className="relative z-1 flex flex-col items-start justify-end w-full h-full text-white p-5 md:p-10 lg:py-12 lg:px-[5%]">
          <div className="w-full max-w-[1600px] flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8 lg:gap-12 pb-20">
            {/* Left side: Logo + Text */}
            <div className="flex flex-col lg:w-[60svw]">
              {/* Large bold headline similar to BCV */}
              <div className="mb-4 md:mb-6 lg:mb-8 overflow-hidden">
                <h1
                  ref={headlineRef}
                  className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[5vw] font-bold leading-[1.1] tracking-tight opacity-0"                >
                  Build Fast,<br />Learn Faster
                </h1>
              </div>

              {/* Supporting text - more refined like BCV's subtitle */}
              <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[70%] overflow-hidden">
                <div
                  ref={supportingTextRef}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-2xl font-normal tracking-tight leading-[1.2] opacity-0 w-full"
                >
                  The Space for Creatives, Makers, and Hackers to Build at NYU.{' '} <br className='hidden lg:block' />
                  No matter where you start, we will help you build your dreams one line at a time.
                </div>
              </div>
            </div>
            
            {/* Right side: CTA Button - BCV style */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 1.50, ease: [0.65, 0, 0.35, 1] }}
              className="lg:flex-shrink-0"
            >
              <a
                href="#programs"
                className="group inline-flex items-center gap-3 border border-white/20 px-8 py-4 text-base font-medium text-white transition-[transform,background-color,color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black active:scale-[0.97] md:text-lg"
              >
                <span>View Programs</span>
                <ArrowRightIcon className="transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
