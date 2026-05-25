'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { BuildTab, ProgramImageAsset } from './types'
import { TabWireframe } from './wireframes'

type StandardBuildTabsSectionProps = {
  buildEyebrow: string
  buildTitle: string
  buildTabs: BuildTab[]
  buildImages?: ProgramImageAsset[]
}

const buildBadgeToneClasses = {
  public: 'border-[#FF9F43]/58 bg-[#FF9F43]/18 text-[#FFF1DD]',
  fund: 'border-[#4DFF94]/40 bg-[#4DFF94]/10 text-[#4DFF94]',
  redacted: 'border-[#B300FF]/35 bg-[#B300FF]/10 text-[#E6C7FF]',
  neutral: 'border-[#EDEDED]/15 bg-[#EDEDED]/5 text-[#EDEDED]/70',
} as const

export default function StandardBuildTabsSection({
  buildEyebrow,
  buildTitle,
  buildTabs,
  buildImages,
}: StandardBuildTabsSectionProps) {
  const [activeBuildTab, setActiveBuildTab] = useState(0)

  useEffect(() => {
    setActiveBuildTab(0)
  }, [buildTabs])

  const buildTitleLines = buildTitle.split('\n')
  const activeBuildTabData = buildTabs[activeBuildTab] ?? buildTabs[0] ?? {
    id: 'cli',
    title: '',
    description: '',
  }
  const activeBuildImage = buildImages?.[activeBuildTab] ?? buildImages?.[0]

  return (
    <section className="px-[5vw] lg:px-[8vw] py-[10svh] border-t border-[#EDEDED]/8">
      <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.15em] uppercase opacity-55 mb-4">
        {buildEyebrow}
      </p>
      <h2
        className="font-[family-name:var(--font-hk-grotesque)] font-medium leading-[0.92] text-[#EDEDED] mb-16 w-full whitespace-nowrap"
        style={{ fontSize: 'clamp(40px, 7.5vw, 120px)', letterSpacing: '-1.2px' }}
      >
        {buildTitleLines.join(' ')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div className="flex flex-col gap-1">
          {buildTabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveBuildTab(index)}
              className={`text-left p-6 border transition-all duration-300 ${
                activeBuildTab === index
                  ? 'border-dashed border-[#4DFF94] text-[#4DFF94]'
                  : 'border-transparent text-[#EDEDED]/50 hover:text-[#EDEDED]/75 hover:border-[#EDEDED]/15'
              }`}
              style={activeBuildTab === index ? { boxShadow: '0 0 24px rgba(77,255,148,0.07)' } : undefined}
            >
              {(tab.serial || tab.badge) && (
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.18em] uppercase text-[#EDEDED]/38">
                    {tab.serial ? `Startup ${tab.serial}` : 'Feature'}
                  </span>
                  {tab.badge && (
                    <span
                      className={`rounded-full border px-2.5 py-1 font-[family-name:var(--font-inter)] text-[10px] font-semibold uppercase tracking-[0.16em] ${
                        buildBadgeToneClasses[tab.badgeTone ?? 'neutral']
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </div>
              )}
              <h3
                className="font-[family-name:var(--font-hk-grotesque)] font-medium whitespace-pre-line leading-tight"
                style={{ fontSize: 'clamp(24px, 2.8vw, 36px)', letterSpacing: '-0.5px' }}
              >
                {tab.title}
              </h3>
              {activeBuildTab === index && (
                <p className="font-[family-name:var(--font-inter)] text-[15px] mt-3 text-[#EDEDED]/68 leading-relaxed">
                  {tab.description}
                </p>
              )}
            </button>
          ))}
        </div>
        <div className="md:sticky md:top-[18svh] flex items-center justify-center">
          <div className="relative w-full max-w-[440px] aspect-square">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(circle at center, rgba(77,255,148,0.05) 0%, transparent 70%)' }}
            />
            {activeBuildImage ? (
              <div className="relative w-full h-full border border-[#EDEDED]/15 overflow-hidden bg-black">
                <Image
                  src={activeBuildImage.src}
                  alt={activeBuildImage.alt}
                  fill
                  className="object-cover opacity-86"
                  sizes="(max-width: 768px) 100vw, 440px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/5" />
                <div className="absolute left-4 right-4 bottom-4 border border-[#EDEDED]/20 bg-black/45 backdrop-blur-sm px-4 py-3">
                  <p className="font-[family-name:var(--font-inter)] text-[11px] tracking-[0.12em] uppercase text-[#EDEDED]/60 mb-1">
                    Current Focus
                  </p>
                  <p className="font-[family-name:var(--font-hk-grotesque)] text-[24px] leading-none text-[#EDEDED] whitespace-pre-line">
                    {activeBuildTabData.title}
                  </p>
                </div>
              </div>
            ) : (
              <TabWireframe tabId={activeBuildTabData.id} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
