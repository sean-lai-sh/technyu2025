'use client'
import React, { useEffect, useState } from 'react'
import CrtScreen from './crt-screen'

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)'/%3E%3C/svg%3E\")";

const Hero = () => {
  const [settled, setSettled] = useState(false);

  // Gate the navbar's fade-in on the wordmark landing (see globals.css)
  useEffect(() => {
    document.documentElement.setAttribute('data-crt-boot', 'pending');
    return () => document.documentElement.removeAttribute('data-crt-boot');
  }, []);

  const handleLogoDone = () => {
    setSettled(true);
    document.documentElement.setAttribute('data-crt-boot', 'settled');
  };

  return (
    <section className="relative w-[100svw] h-[100svh] overflow-hidden bg-black">
      {/* CRT boot: sage veil -> clear-window wave -> LED dot-matrix wordmark */}
      <CrtScreen onLogoDone={handleLogoDone} />

      {/* soft phosphor glow drifting across the tube */}
      <div
        className="pointer-events-none absolute inset-0 z-10 crt-glow"
        style={{
          background:
            'radial-gradient(120% 90% at 18% 85%, rgba(190,200,195,0.10), transparent 55%), radial-gradient(80% 60% at 70% 20%, rgba(120,135,128,0.05), transparent 60%)',
        }}
      />

      {/* film grain */}
      <div
        className="pointer-events-none absolute -inset-[60px] z-10 crt-grain opacity-[0.07] mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      {/* scanlines — motionless, felt more than seen */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-25"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* tube vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(115% 115% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* tagline fades in once the wordmark lands */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-[68%] z-20 flex justify-center transition-opacity duration-1000 ${
          settled ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="font-satoshi tracking-tight text-white/80 text-lg md:text-2xl text-center px-6">
          The Space for Artists, Makers, and Hackers to Build @ NYU
        </p>
      </div>
    </section>
  )
}

export default Hero
