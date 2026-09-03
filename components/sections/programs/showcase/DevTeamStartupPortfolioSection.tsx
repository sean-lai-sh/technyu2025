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

  useEffect(() => {
    setActiveBuildTab(0)
  }, [buildTabs])

  const buildTitleLines = buildTitle.split('\n')
  const activeBuildTabData = buildTabs[activeBuildTab] ?? buildTabs[0] ?? {
    id: 'the-interface',
    title: '',
    description: '',
    companySummary: '',
  }

  return (
    <section className="border-t border-white/10 px-[5vw] py-[8svh] lg:px-[8vw]">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col justify-center">
        <p className="mb-4 font-[family-name:var(--font-inter)] text-[12px] font-semibold uppercase tracking-[0.22em] text-white/48">
          {buildEyebrow}
        </p>
        <h2 className="text-display-1 text-white w-full">
          {buildTitleLines.join(' ')}
        </h2>

        <div className="mt-12 lg:h-[80svh] lg:max-h-[80svh]">
          <div className="relative grid h-full grid-cols-1 overflow-hidden border border-white/10 bg-surface-deep lg:grid-cols-[minmax(460px,0.95fr)_minmax(0,1fr)] xl:grid-cols-[minmax(520px,1.02fr)_minmax(0,0.98fr)]">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(237,237,237,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(237,237,237,0.08) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative border-b border-white/10 lg:border-b-0 lg:border-r lg:border-r-white/10">
              <div className="flex h-full flex-col overflow-hidden">
                {buildTabs.map((tab, index) => {
                  const isRedactedTab = tab.badgeTone === 'redacted' || tab.id.startsWith('redacted-')

                  return (
                    <div
                      key={tab.id}
                      className={`group relative overflow-hidden border-b border-white/10 transition-colors [transition-duration:var(--motion-hover-in-duration)] [transition-timing-function:var(--motion-brand-enter)] last:border-b-0 ${
                        activeBuildTab === index ? 'bg-surface-raised' : 'bg-transparent'
                      }`}
                      style={activeBuildTab === index ? { boxShadow: 'inset 0 0 0 1px rgba(77,255,148,0.28)' } : undefined}
                    >
                      <button
                        onClick={() => setActiveBuildTab(index)}
                        className={`relative z-10 block w-full px-5 py-4 text-left transition-colors [transition-duration:var(--motion-hover-in-duration)] [transition-timing-function:var(--motion-brand-enter)] ${
                          activeBuildTab === index ? 'text-white' : 'text-white/48 hover:text-white/72'
                        }`}
                      >
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.22em] text-white/48">
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
                        <h3 className="text-display-3 text-current">
                          {isRedactedTab ? (
                            <RedactedDecryptLabel label={tab.title} />
                          ) : (
                            tab.title
                          )}
                        </h3>
                      </button>

                      <div
                        className={`grid transition-[grid-template-rows,opacity] [transition-duration:var(--motion-enter-duration)] [transition-timing-function:var(--motion-brand-enter)] ${
                          activeBuildTab === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="max-h-[12rem] overflow-hidden border-t border-white/10 px-5 pb-4 pt-4">
                            <p className="font-[family-name:var(--font-inter)] text-[13px] leading-relaxed text-white/72">
                              {tab.companySummary ?? tab.description}
                            </p>
                            {tab.cohortWork && (
                              <p className="mt-3 font-[family-name:var(--font-inter)] text-[13px] leading-relaxed text-white/48">
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
