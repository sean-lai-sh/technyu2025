import Image from 'next/image'

type LogoGridItem = {
  src: string
  alt: string
  width?: number
  height?: number
  maxVisualWidth?: number
  maxVisualHeight?: number
  offsetX?: number
  offsetY?: number
  marker?: string
  markerOffsetX?: number
  markerOffsetY?: number
}

interface LogoGridProps {
  logos: LogoGridItem[]
  className?: string
  footnote?: string
  density?: 'default' | 'compact'
}

const DENSITY = {
  default: {
    grid: 'max-w-md grid-cols-2 gap-x-8 gap-y-4 sm:max-w-2xl sm:grid-cols-3 lg:max-w-3xl lg:grid-cols-3 lg:gap-x-10 lg:gap-y-6 xl:max-w-5xl xl:grid-cols-4 xl:gap-x-12 2xl:max-w-7xl 2xl:grid-cols-6',
    cell: 'h-[92px] lg:h-[108px] xl:h-[92px]',
    inner: 'h-12 lg:h-14 xl:h-12',
    maxVisualWidth: 136,
    maxVisualHeight: 48,
  },
  compact: {
    grid: 'max-w-sm grid-cols-3 gap-x-6 gap-y-5 md:max-w-5xl md:grid-cols-6 md:gap-x-8 md:gap-y-7',
    cell: 'h-[52px] lg:h-[58px]',
    inner: 'h-8 lg:h-9',
    maxVisualWidth: 92,
    maxVisualHeight: 30,
  },
} as const

function getContainedDimensions(
  width: number,
  height: number,
  maxVisualWidth: number,
  maxVisualHeight: number,
) {
  const scale = Math.min(maxVisualWidth / width, maxVisualHeight / height)

  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  }
}

export default function LogoGrid({ logos, className = '', footnote, density = 'default' }: LogoGridProps) {
  const tier = DENSITY[density]

  return (
    <div className={`mx-auto ${className}`}>
      <div className={`mx-auto grid w-full justify-items-center ${tier.grid}`}>
        {logos.map((logo) => {
          const baseWidth = logo.width || 120
          const baseHeight = logo.height || 60
          let maxVisualWidth = logo.maxVisualWidth || tier.maxVisualWidth
          let maxVisualHeight = logo.maxVisualHeight || tier.maxVisualHeight
          if (density === 'compact') {
            maxVisualWidth = Math.min(maxVisualWidth, tier.maxVisualWidth)
            maxVisualHeight = Math.min(maxVisualHeight, tier.maxVisualHeight)
          }
          const offsetX = logo.offsetX || 0
          const offsetY = logo.offsetY || 0
          const markerOffsetX = logo.markerOffsetX || 0
          const markerOffsetY = logo.markerOffsetY || 0
          const fittedDimensions = getContainedDimensions(
            baseWidth,
            baseHeight,
            maxVisualWidth,
            maxVisualHeight,
          )

          return (
            <div key={`${logo.src}-${logo.alt}`} className={`relative flex w-full items-center justify-center ${tier.cell}`}>
              <div className={`flex w-full items-center justify-center ${tier.inner}`}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={fittedDimensions.width}
                  height={fittedDimensions.height}
                  className="block h-auto max-w-full object-contain"
                  style={{
                    maxWidth: `${maxVisualWidth}px`,
                    maxHeight: `${maxVisualHeight}px`,
                    transform: `translate(${offsetX}px, ${offsetY}px)`,
                  }}
                  unoptimized
                />
              </div>
              {logo.marker ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 z-10 font-[family-name:var(--font-inter)] text-sm font-semibold leading-none text-white/90"
                  style={{
                    transform: `translate(${offsetX + markerOffsetX}px, ${offsetY + markerOffsetY}px)`,
                  }}
                >
                  {logo.marker}
                </span>
              ) : null}
            </div>
          )
        })}
      </div>
      {footnote ? (
        <p className="mt-4 text-center font-[family-name:var(--font-inter)] text-xs tracking-[0.12em] text-white/48 sm:text-sm">
          {footnote}
        </p>
      ) : null}
    </div>
  )
}
