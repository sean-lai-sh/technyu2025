'use client'
import React from 'react'
import Image from 'next/image'

interface LogoSliderProps {
  logos: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }[];
  speed?: number;
  className?: string;
}

const LogoSlider = ({ logos, speed = 30, className = '' }: LogoSliderProps) => {
  return (
    <div className={`overflow-hidden py-8 border-t-2 border-b-2 w-[100svw] ${className}`}
    style={{ boxShadow: 'inset 0px 0px 100px rgba(179, 0, 255, 0.4)' }}>
      <div className="relative flex">
        {/* First set of logos */}
        <div 
          className="flex items-center space-x-12 animate-scroll whitespace-nowrap"
          style={{
            animationDuration: `${speed}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        >
          {logos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 w-32 h-16 flex items-center justify-center transition-all duration-500 hover:scale-110"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 120}
                height={logo.height || 60}
                className="object-contain max-w-full max-h-full"
                unoptimized
                priority={index < 5}
                loading='eager'
              />
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless loop */}
        <div
          className="flex items-center space-x-12 animate-scroll whitespace-nowrap"
          style={{
            animationDuration: `${speed}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }}
        >
          {logos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 w-32 h-16 flex items-center justify-center transition-all duration-500 hover:scale-110"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 120}
                height={logo.height || 60}
                className="object-contain max-w-full max-h-full"
                unoptimized
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .animate-scroll {
          animation-name: scroll;
        }
      `}</style>
    </div>
  )
}

export default LogoSlider
