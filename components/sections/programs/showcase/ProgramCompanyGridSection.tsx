import LogoGrid from '@/components/ui/logo-grid'

type LogoGridItem = {
  src: string
  alt: string
  width?: number
  height?: number
  maxVisualWidth?: number
  maxVisualHeight?: number
  offsetX?: number
  offsetY?: number
}

type ProgramCompanyGridSectionProps = {
  eyebrow: string
  title: string
  logos: LogoGridItem[]
  footnote?: string
}

export default function ProgramCompanyGridSection({
  eyebrow,
  title,
  logos,
  footnote,
}: ProgramCompanyGridSectionProps) {
  const titleLines = title.split('\n')

  return (
    <section className="px-[5vw] lg:px-[8vw] py-[10svh] border-t border-[#EDEDED]/8">
      <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.15em] uppercase opacity-55 mb-4">
        {eyebrow}
      </p>
      <h2
        className="font-[family-name:var(--font-satoshi)] font-medium leading-[0.92] text-[#EDEDED] mb-14"
        style={{ fontSize: 'clamp(40px, 6vw, 68px)', letterSpacing: '-1.2px' }}
      >
        {titleLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < titleLines.length - 1 && <br />}
          </span>
        ))}
      </h2>
      <LogoGrid logos={logos} footnote={footnote} className="opacity-60 hover:opacity-80 transition-opacity duration-500" />
    </section>
  )
}
