import Image from 'next/image'
import Link from 'next/link'
import { spotlightContent, type SpotlightItem } from '@/lib/homepage/spotlight'

const transitionClass =
  'transition-[transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1'

function SpotlightEntry({
  item,
  className,
  titleClassName,
}: {
  item: SpotlightItem
  className?: string
  titleClassName?: string
}) {
  const content = (
    <div
      className={`group relative overflow-hidden border border-white/12 bg-[#050505] ${transitionClass} ${className ?? ''}`}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.025]"
        sizes="(max-width: 1024px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.18)_38%,rgba(0,0,0,0.76)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/45 p-5 backdrop-blur-[2px] md:p-6">
        <h3
          className={`max-w-[12ch] font-[family-name:var(--font-darker-grotesque)] text-[2.5rem] font-bold leading-[0.9] tracking-[-0.03em] text-white ${titleClassName ?? ''}`}
        >
          {item.title}
        </h3>
      </div>
    </div>
  )

  if (item.linkMode === 'internal' || item.linkMode === 'markdown') {
    return <Link href={item.url}>{content}</Link>
  }

  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  )
}

export default function Spotlight() {
  const { featuredItem, items } = spotlightContent

  return (
    <section className="w-full px-5 py-18 md:px-10 lg:px-[5vw] lg:py-24">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8">
        <div className="flex items-center gap-3 text-white">
          <span className="h-3 w-3 rounded-[4px] bg-[#4D8DFF]" />
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/78">
            Spotlight
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.28fr)_minmax(0,0.72fr)]">
          <SpotlightEntry
            item={featuredItem}
            className="min-h-[420px] rounded-[1.35rem] shadow-[0_28px_90px_rgba(0,0,0,0.34)] md:min-h-[520px]"
            titleClassName="text-[3.35rem] sm:text-[4.2rem] lg:text-[5.1rem]"
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {items.map((item) => (
              <SpotlightEntry
                key={item.title}
                item={item}
                className="min-h-[260px] rounded-[1.15rem] shadow-[0_22px_70px_rgba(0,0,0,0.28)]"
                titleClassName="max-w-[13ch] text-[2.15rem] md:text-[2.45rem]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
