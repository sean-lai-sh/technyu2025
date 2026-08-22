import Image from 'next/image'
import Link from 'next/link'
import { PressPostPreview } from '@/lib/types'

function formatPressDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/New_York',
  }).format(date)
}

export default function PressIndexList({ posts }: { posts: PressPostPreview[] }) {
  return (
    <section className="w-full px-5 pb-20 md:px-10 lg:px-[5vw] lg:pb-28">
      <div className="mx-auto w-full max-w-[1600px] border-t border-white/10 pt-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-white/28">
              Archive
            </p>
            <h2 className="pt-2 font-[family-name:var(--font-satoshi)] text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              All posts
            </h2>
          </div>
          <p className="max-w-[34ch] text-sm leading-6 text-white/48">
            The rest of the editorial archive, sorted by publish date and kept separate from the
            curated spotlight.
          </p>
        </div>

        <div className="divide-y divide-white/10 border border-white/10 bg-surface-base">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="group relative grid gap-5 overflow-hidden px-5 py-5 transition-[background-color,border-color,box-shadow,transform] duration-300 hover:bg-[linear-gradient(90deg,rgba(77,255,148,0.06)_0%,rgba(77,255,148,0.015)_30%,rgba(255,255,255,0.02)_100%)] hover:shadow-[inset_0_0_0_1px_rgba(77,255,148,0.18),0_0_0_1px_rgba(77,255,148,0.08)] md:grid-cols-[168px_112px_minmax(0,1fr)] md:items-center md:px-6 md:py-6 lg:grid-cols-[172px_128px_minmax(0,1fr)] lg:gap-6"
              >
                <span className="pointer-events-none absolute inset-y-0 left-0 w-px bg-[linear-gradient(180deg,rgba(77,255,148,0)_0%,rgba(77,255,148,0.86)_20%,rgba(77,255,148,0.62)_78%,rgba(77,255,148,0)_100%)] opacity-45 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex flex-wrap items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/48 md:block md:space-y-2 md:gap-0">
                  <span className="block text-white/72">{formatPressDate(post.publishedAt)}</span>
                  <span className="hidden md:block text-white/28">/</span>
                  <span className="block">{post.eyebrow || post.category}</span>
                </div>

                <div className="relative aspect-square overflow-hidden border border-white/10 bg-surface-base">
                  {post.coverImage.url ? (
                    <Image
                      src={post.coverImage.url}
                      alt={post.coverImage.alt || post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 96px, 128px"
                    />
                  ) : (
                    <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(77,255,148,0.18),transparent_36%),linear-gradient(180deg,#131313_0%,#090909_100%)]" />
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(0,0,0,0.28)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,rgba(77,255,148,0)_0%,rgba(77,255,148,0.75)_50%,rgba(77,255,148,0)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="min-w-0">
                  <h3 className="font-[family-name:var(--font-satoshi)] text-[1.8rem] font-bold leading-[0.9] tracking-[-0.04em] text-white md:text-[2.2rem]">
                    {post.title}
                  </h3>
                  <p className="mt-3 max-w-[64ch] text-sm leading-7 text-white/48 md:text-[1rem]">
                    {post.excerpt}
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 border border-[#4DFF94]/35 bg-[#4DFF94]/10 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#8DFFB7] shadow-[0_0_0_1px_rgba(77,255,148,0.06),0_0_26px_rgba(77,255,148,0.08)] transition-colors duration-300 group-hover:border-[#4DFF94]/65 group-hover:bg-[#4DFF94]/16 group-hover:text-[#C7FFD9]">
                      Read article
                    </span>
                    <span className="text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-white/28 transition-colors duration-300 group-hover:text-white/48">
                      Open
                    </span>
                    <span className="text-lg leading-none text-[#8DFFB7] transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-5 py-10 text-sm leading-6 text-white/48 md:px-6">
              No blog posts have been published yet.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
