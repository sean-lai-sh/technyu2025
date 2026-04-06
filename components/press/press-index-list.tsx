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
      <div className="mx-auto w-full max-w-[1600px] border-t border-white/12 pt-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-white/40">
              Archive
            </p>
            <h2 className="pt-2 font-[family-name:var(--font-darker-grotesque)] text-4xl font-bold tracking-[-0.04em] text-white md:text-5xl">
              All posts
            </h2>
          </div>
          <p className="max-w-[34ch] text-sm leading-6 text-white/48">
            The rest of the editorial archive, sorted by publish date and kept separate from the
            curated spotlight.
          </p>
        </div>

        <div className="divide-y divide-white/10 border border-white/10 bg-[#060606]">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post._id}
                href={`/press/${post.slug}`}
                className="group grid gap-4 px-5 py-5 transition-colors hover:bg-white/[0.03] md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-center md:px-6 md:py-6"
              >
                <div className="flex flex-wrap items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white/42 md:block md:space-y-2 md:gap-0">
                  <span className="block text-white/66">{formatPressDate(post.publishedAt)}</span>
                  <span className="hidden md:block">/</span>
                  <span className="block">{post.eyebrow || post.category}</span>
                </div>

                <div className="min-w-0">
                  <h3 className="font-[family-name:var(--font-darker-grotesque)] text-[1.8rem] font-bold leading-[0.9] tracking-[-0.04em] text-white md:text-[2.2rem]">
                    {post.title}
                  </h3>
                  <p className="mt-3 max-w-[64ch] text-sm leading-7 text-white/64 md:text-[1rem]">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start pt-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-white/44 transition-colors group-hover:text-white/78 md:self-center md:pt-0">
                  <span>Open</span>
                  <span className="text-lg leading-none transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-5 py-10 text-sm leading-6 text-white/52 md:px-6">
              No press posts have been published yet.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
