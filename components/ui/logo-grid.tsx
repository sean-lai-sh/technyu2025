import Image from 'next/image'

type LogoGridItem = {
  src: string
  alt: string
  width?: number
  height?: number
}

interface LogoGridProps {
  logos: LogoGridItem[]
  className?: string
}

const MAX_VISUAL_WIDTH = 136
const MAX_VISUAL_HEIGHT = 48

function getContainedDimensions(width: number, height: number) {
  const scale = Math.min(MAX_VISUAL_WIDTH / width, MAX_VISUAL_HEIGHT / height, 1)

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
        const fittedDimensions = getContainedDimensions(baseWidth, baseHeight)

        return (
          <div key={`${logo.src}-${logo.alt}`} className="flex h-[92px] w-full items-center justify-center">
            <div className="flex h-12 w-full items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={fittedDimensions.width}
                height={fittedDimensions.height}
                className="h-auto w-auto max-h-12 max-w-[136px] object-contain"
                unoptimized
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
