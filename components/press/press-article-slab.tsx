import { PressPost } from '@/lib/types'
import { cn } from '@/lib/utils'
import PressPortableTextRenderer from './portable-text'

export function formatPressDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/New_York',
  }).format(date)
}

export function PressArticleMeta({ post }: { post: PressPost }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/50">
      <span>{post.eyebrow || post.category}</span>
      <span className="h-1 w-1 rounded-full bg-white/20" />
      <span>{formatPressDate(post.publishedAt)}</span>
      {post.sourceName ? (
        <>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>{post.sourceName}</span>
        </>
      ) : null}
    </div>
  )
}

export function PressArticleSlab({
  post,
  className,
}: {
  post: PressPost
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative mx-auto max-w-[1500px] overflow-hidden border border-white/10 bg-[linear-gradient(180deg,rgba(13,13,18,0.96)_0%,rgba(7,7,10,0.985)_100%)] shadow-[0_30px_90px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04),0_0_140px_rgba(111,76,255,0.16)]',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-[8%] top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(170,138,255,0.85)_50%,rgba(255,255,255,0)_100%)]" />
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-56 w-56 rounded-full bg-[#7b5cff]/18 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-[-18%] left-[-5%] h-72 w-72 rounded-full bg-[#5b3dff]/10 blur-[130px]" />

      <div className="relative grid gap-10 px-6 py-7 md:px-10 md:py-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 lg:px-12 lg:py-12">
        <aside className="flex flex-col gap-8 border-b border-white/8 pb-8 lg:border-b-0 lg:border-r lg:border-white/8 lg:pb-0 lg:pr-10">
          <div className="space-y-3">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-white/48">
              Article
            </span>
            <div className="h-px w-[4.5rem] bg-[linear-gradient(90deg,rgba(170,138,255,0.95)_0%,rgba(170,138,255,0.18)_100%)]" />
          </div>

          <div className="space-y-4">
            <div className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/32">
              Published
            </div>
            <div className="text-sm leading-6 text-white/72">{formatPressDate(post.publishedAt)}</div>
          </div>

          <div className="space-y-4">
            <div className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/32">
              Desk
            </div>
            <div className="text-sm leading-6 text-white/72">{post.eyebrow || post.category}</div>
          </div>

          {post.sourceName ? (
            <div className="space-y-4">
              <div className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-white/32">
                Source
              </div>
              <div className="text-sm leading-6 text-white/72">{post.sourceName}</div>
            </div>
          ) : null}

          {post.sourceUrl ? (
            <div className="pt-2">
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 border border-white/12 bg-white/5 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/70 transition-colors hover:bg-white hover:text-black"
              >
                Read source
              </a>
            </div>
          ) : null}
        </aside>

        <div className="space-y-10 lg:space-y-12">
          <div className="space-y-6">
            <PressArticleMeta post={post} />
            <p className="max-w-[19ch] text-[2rem] leading-[1.04] tracking-[-0.045em] text-white/94 sm:text-[2.6rem] lg:text-[3.5rem]">
              {post.excerpt}
            </p>
          </div>

          <div className="h-px w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.04)_45%,rgba(255,255,255,0)_100%)]" />

          <div className="max-w-[72ch] space-y-8">
            <PressPortableTextRenderer value={post.body} />
          </div>

          {post.sourceUrl ? (
            <div className="border-t border-white/8 pt-2 lg:hidden">
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 border border-white/12 bg-white/5 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/70 transition-colors hover:bg-white hover:text-black"
              >
                Read source
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
