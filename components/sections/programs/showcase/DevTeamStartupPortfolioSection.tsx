'use client'

import { useEffect, useState } from 'react'
import RedactedDecryptLabel from './RedactedDecryptLabel'
import StartupPortfolioGraphic from './StartupPortfolioGraphic'
import { BuildTab } from './types'

type DevTeamStartupPortfolioSectionProps = {
  buildEyebrow: string
  buildTitle: string
  buildTabs: BuildTab[]
  startupAsciiArtById?: Partial<Record<string, string>>
}

const buildBadgeToneClasses = {
  public: 'border-[#FF9F43]/58 bg-[#FF9F43]/18 text-[#FFF1DD]',
  fund: 'border-[#8FC6FF]/52 bg-[#10264F]/72 text-[#F5FBFF] shadow-[0_0_20px_rgba(143,198,255,0.14)]',
  redacted: 'border-[#B300FF]/35 bg-[#B300FF]/10 text-[#E6C7FF]',
  neutral: 'border-[#EDEDED]/15 bg-[#EDEDED]/5 text-[#EDEDED]/70',
} as const

export default function DevTeamStartupPortfolioSection({
  buildEyebrow,
  buildTitle,
  buildTabs,
  startupAsciiArtById,
}: DevTeamStartupPortfolioSectionProps) {
  const [activeBuildTab, setActiveBuildTab] = useState(0)
  const [hoveredBuildTab, setHoveredBuildTab] = useState<number | null>(null)

  useEffect(() => {
    setActiveBuildTab(0)
    setHoveredBuildTab(null)
  }, [buildTabs])

  const buildTitleLines = buildTitle.split('\n')
  const activeBuildTabData = buildTabs[activeBuildTab] ?? buildTabs[0] ?? {
    id: 'the-interface',
    title: '',
    description: '',
    companySummary: '',
  }

  return (
    <section className="border-t border-[#EDEDED]/8 px-[5vw] py-[8svh] lg:px-[8vw]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-center">
        <p className="mb-4 font-[family-name:var(--font-inter)] text-[13px] font-semibold uppercase tracking-[0.15em] opacity-55">
          {buildEyebrow}
        </p>
        <h2
          className="font-[family-name:var(--font-darker-grotesque)] font-medium leading-[0.92] text-[#EDEDED] w-full whitespace-nowrap"
          style={{ fontSize: 'clamp(40px, 7.5vw, 120px)', letterSpacing: '-1.2px' }}
        >
          {buildTitleLines.join(' ')}
        </h2>

        <div className="mt-12 lg:h-[80svh] lg:max-h-[80svh]">
          <div className="relative grid h-full grid-cols-1 overflow-hidden border border-[#EDEDED]/14 bg-[linear-gradient(180deg,#090909_0%,#050505_100%)] lg:grid-cols-[minmax(460px,0.95fr)_minmax(0,1fr)] xl:grid-cols-[minmax(520px,1.02fr)_minmax(0,0.98fr)]">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(237,237,237,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(237,237,237,0.08) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative border-b border-[#EDEDED]/10 lg:border-b-0 lg:border-r lg:border-r-[#EDEDED]/10">
              <div className="flex h-full flex-col overflow-hidden">
                {buildTabs.map((tab, index) => {
                  const isRedactedTab = tab.badgeTone === 'redacted' || tab.id.startsWith('redacted-')
                  const isDecryptHovering = isRedactedTab && hoveredBuildTab === index

                  return (
                    <div
                      key={tab.id}
                      className={`group relative overflow-hidden border-b border-[#EDEDED]/10 transition-all duration-300 last:border-b-0 ${
                        activeBuildTab === index ? 'bg-[#0b120d]' : 'bg-transparent'
                      }`}
                      onMouseEnter={isRedactedTab ? () => setHoveredBuildTab(index) : undefined}
                      onMouseLeave={isRedactedTab ? () => setHoveredBuildTab((current) => (current === index ? null : current)) : undefined}
                      style={activeBuildTab === index ? { boxShadow: 'inset 0 0 0 1px rgba(77,255,148,0.28)' } : undefined}
                    >
                      {isRedactedTab && (
                        <>
                          <div
                            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
                            style={{
                              background:
                                'linear-gradient(115deg, rgba(179,0,255,0.09) 0%, rgba(8,8,8,0) 48%, rgba(77,255,148,0.06) 100%)',
                            }}
                          />
                          <div
                            className="pointer-events-none absolute inset-y-0 left-[-28%] w-[28%] opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[460%] group-hover:opacity-100 group-focus-within:translate-x-[460%] group-focus-within:opacity-100"
                            style={{
                              background: 'linear-gradient(90deg, transparent 0%, rgba(77,255,148,0.22) 50%, transparent 100%)',
                              filter: 'blur(10px)',
                            }}
                          />
                        </>
                      )}
                      <button
                        onClick={() => setActiveBuildTab(index)}
                        onFocus={isRedactedTab ? () => setHoveredBuildTab(index) : undefined}
                        onBlur={isRedactedTab ? () => setHoveredBuildTab((current) => (current === index ? null : current)) : undefined}
                        className={`relative z-10 block w-full px-5 py-4 text-left transition-all duration-300 ${
                          activeBuildTab === index ? 'text-[#EDEDED]' : 'text-[#EDEDED]/56 hover:text-[#EDEDED]/82'
                        }`}
                      >
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.18em] text-[#EDEDED]/35">
                            {tab.serial ? tab.serial : 'Startup'}
                          </span>
                          {tab.badge && (
                            <span
                              className={`rounded-none border px-2.5 py-1 font-[family-name:var(--font-inter)] text-[10px] font-semibold uppercase tracking-[0.16em] ${
                                buildBadgeToneClasses[tab.badgeTone ?? 'neutral']
                              }`}
                            >
                              {tab.badge}
                            </span>
                          )}
                        </div>
                        <h3
                          aria-label={isRedactedTab ? tab.title : undefined}
                          className="font-[family-name:var(--font-darker-grotesque)] text-[clamp(28px,3vw,38px)] leading-[0.9]"
                          style={{ letterSpacing: '-0.7px' }}
                        >
                          {isRedactedTab ? (
                            <RedactedDecryptLabel label={tab.title} engaged={isDecryptHovering} />
                          ) : (
                            tab.title
                          )}
                        </h3>
                      </button>

                      <div
                        className={`grid transition-all duration-300 ${
                          activeBuildTab === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="max-h-[12rem] overflow-hidden border-t border-[#EDEDED]/10 px-5 pb-4 pt-4">
                            <p className="font-[family-name:var(--font-inter)] text-[13px] leading-relaxed text-[#EDEDED]/72">
                              {tab.companySummary ?? tab.description}
                            </p>
                            {tab.cohortWork && (
                              <p className="mt-3 font-[family-name:var(--font-inter)] text-[13px] leading-relaxed text-[#EDEDED]/48">
                                {tab.cohortWork}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="relative flex min-h-[360px] items-center justify-center p-3 md:p-4 lg:min-h-0 lg:p-3">
              <div
                className="pointer-events-none absolute inset-0 blur-3xl"
                style={{ background: 'radial-gradient(circle at center, rgba(77,255,148,0.06) 0%, transparent 66%)' }}
              />
              <div className="relative h-full w-full min-h-[320px] lg:min-h-0">
                <StartupPortfolioGraphic
                  startupId={activeBuildTabData.id}
                  asciiArt={startupAsciiArtById?.[activeBuildTabData.id]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
