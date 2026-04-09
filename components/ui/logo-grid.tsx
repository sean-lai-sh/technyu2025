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
}

interface LogoGridProps {
  logos: LogoGridItem[]
  className?: string
}

const DEFAULT_MAX_VISUAL_WIDTH = 136
const DEFAULT_MAX_VISUAL_HEIGHT = 48

function getContainedDimensions(
  width: number,
  height: number,
  maxVisualWidth: number,
  maxVisualHeight: number,
) {
  const scale = Math.min(maxVisualWidth / width, maxVisualHeight / height, 1)

  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  }
}

export default function LogoGrid({ logos, className = '' }: LogoGridProps) {
  return (
    <div
      className={`mx-auto grid grid-cols-2 justify-items-center gap-x-8 gap-y-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-12 ${className}`}
    >
      {logos.map((logo) => {
        const baseWidth = logo.width || 120
        const baseHeight = logo.height || 60
        const maxVisualWidth = logo.maxVisualWidth || DEFAULT_MAX_VISUAL_WIDTH
        const maxVisualHeight = logo.maxVisualHeight || DEFAULT_MAX_VISUAL_HEIGHT
        const offsetX = logo.offsetX || 0
        const offsetY = logo.offsetY || 0
        const fittedDimensions = getContainedDimensions(
          baseWidth,
          baseHeight,
          maxVisualWidth,
          maxVisualHeight,
        )

        return (
          <div key={`${logo.src}-${logo.alt}`} className="flex h-[92px] w-full items-center justify-center">
            <div className="flex h-12 w-full items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={fittedDimensions.width}
                height={fittedDimensions.height}
                className="block h-auto w-auto object-contain"
                style={{
                  maxWidth: `${maxVisualWidth}px`,
                  maxHeight: `${maxVisualHeight}px`,
                  transform: `translate(${offsetX}px, ${offsetY}px)`,
                }}
                unoptimized
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
