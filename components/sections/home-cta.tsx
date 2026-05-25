import React from 'react'
import { ArrowRightIcon, ExternalLinkIcon } from 'lucide-react'
import { EVENTS_URL } from '@/lib/consts'

const DISCORD_URL = 'https://discord.gg/q3cBnFMpMQ'

const HomeCTA = () => {
  return (
    <section className="w-[100svw] px-5 py-8 pb-16 md:px-10 md:py-12 lg:px-[5vw]">
      <div className="relative border border-white/10 bg-surface-raised px-6 py-8 shadow-[0_36px_120px_rgba(0,0,0,0.42)] md:px-10 md:py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/48">
              Stay connected
            </p>
            <h2 className="mt-3 text-display-3 font-display-semibold text-white">
              Join the community, then see what is happening next.
            </h2>
            <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-white/72">
              Discord is where the club stays active. The calendar shows what is coming up now.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-3 border border-white/20 bg-white px-6 py-4 text-sm font-medium text-black transition-[transform,background-color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:bg-white/90 active:scale-[0.97]"
            >
              <span>Join Discord</span>
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1" />
            </a>
            <a
              href={EVENTS_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-3 border border-white/20 px-6 py-4 text-sm font-medium text-white transition-[transform,background-color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.97]"
            >
              <span>View Events</span>
              <ExternalLinkIcon className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeCTA
