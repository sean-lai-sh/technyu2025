import Image from 'next/image'
import Link from 'next/link'
import {
  getSharedSpotlightContent,
  type SpotlightContent,
  type SpotlightItem,
} from '@/lib/homepage/spotlight'
import { Separator } from '@/components/ui/separator'

function SpotlightMetaLine({ item }: { item: SpotlightItem }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-white/48">
      <span>{item.eyebrow}</span>
      {item.date ? (
        <>
          <span className="h-1 w-1 bg-white/28" />
          <span>{item.date}</span>
        </>
      ) : null}
    </div>
  )
}

function SecondarySpotlightEntry({
  item,
  className,
  titleClassName,
}: {
  item: SpotlightItem
  className?: string
  titleClassName?: string
}) {
  const content = (
    <div className={`h-full bg-[#050505] ${className ?? ''}`}>
      <div className="grid h-full grid-cols-[minmax(0,1fr)_120px] items-start gap-4 bg-[#040404] sm:grid-cols-[minmax(0,1fr)_140px] md:grid-cols-[minmax(0,1fr)_150px]">
        <div>
          <h3
            className={`max-w-[9ch] self-start font-[family-name:var(--font-darker-grotesque)] text-[1.9rem] font-bold leading-[0.9] tracking-[-0.035em] text-white ${titleClassName ?? ''}`}
          >
            {item.title}
          </h3>
          <SpotlightMetaLine item={item} />
        </div>
        <div className="relative aspect-square">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 120px, 150px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.12)_100%)]" />
        </div>
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

function FeaturedSpotlightEntry({ item }: { item: SpotlightItem }) {
  const content = (
    <div className="bg-[#050505]">
      <div className="grid lg:h-[60svh] lg:grid-cols-[minmax(0,1fr)_520px]">
        <div className="relative z-10 flex items-end bg-[linear-gradient(180deg,#090909_0%,#040404_100%)] p-6 md:p-8 lg:h-full lg:p-10">
          <div>
            <h3 className="max-w-[8.5ch] font-[family-name:var(--font-darker-grotesque)] text-[3.6rem] font-bold leading-[0.84] tracking-[-0.045em] text-white sm:text-[4.5rem] lg:text-[clamp(4.6rem,4.5vw,5.3rem)]">
              {item.title}
            </h3>
            <SpotlightMetaLine item={item} />
          </div>
        </div>

        <div className="relative aspect-square lg:h-full lg:aspect-auto">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 520px"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.01)_24%,rgba(0,0,0,0.28)_100%)]" />
        </div>
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

export function SpotlightSection({ content }: { content: SpotlightContent }) {
  const { featuredItem, items } = content

  return (
    <section className="w-full px-5 py-18 md:px-10 lg:px-[5vw] lg:py-24">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8">
        <div className="flex items-center gap-3 text-white">
          <span className="h-3 w-3 bg-[#4D8DFF]" />
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/78">
            Spotlight
          </span>
        </div>

        <div className="border-t border-white/16 pt-5">
          <FeaturedSpotlightEntry item={featuredItem} />

          <Separator className="my-4 bg-white/55" />

          <div className="flex w-full flex-col gap-6 md:flex-row md:items-stretch md:gap-0">
            <div className="md:min-w-0 md:flex-1">
              <SecondarySpotlightEntry
                item={items[0]}
                className="min-h-[220px]"
                titleClassName="max-w-[9ch] text-[1.9rem] md:text-[2.05rem]"
              />
            </div>

            <Separator orientation="vertical" className="ml-12 mr-3 hidden h-full min-h-[150px] w-[2px] md:block bg-white/70" />

            <div className="md:min-w-0 md:flex-1">
              <SecondarySpotlightEntry
                item={items[1]}
                className="min-h-[220px]"
                titleClassName="max-w-[9ch] text-[1.9rem] md:text-[2.05rem]"
              />
            </div>

            <Separator orientation="vertical" className="ml-12 mr-3 hidden h-full min-h-[150px] w-[2px] md:block bg-white/70" />

            <div className="md:min-w-0 md:flex-1">
              <SecondarySpotlightEntry
                item={items[2]}
                className="min-h-[220px]"
                titleClassName="max-w-[9ch] text-[1.9rem] md:text-[2.05rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default async function Spotlight() {
  const content = await getSharedSpotlightContent()

  return <SpotlightSection content={content} />
}
