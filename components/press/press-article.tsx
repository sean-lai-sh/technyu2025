import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PressLayout, PressPost } from '@/lib/types'
import ImmersiveRevealArticle from './immersive-reveal-article'
import { PressArticleMeta, PressArticleSlab } from './press-article-slab'

function SplitHero({ post }: { post: PressPost }) {
  return (
    <section className="px-5 pt-[9svh] md:px-10 lg:px-[5vw] lg:pt-[14svh]">
      <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-[0.84fr_1.16fr] lg:gap-8">
        <div className="flex min-h-[30rem] flex-col justify-end border border-white/10 bg-[linear-gradient(180deg,#0b0b0b_0%,#050505_100%)] p-6 md:p-8 lg:px-10 lg:py-9 xl:px-12">
          <PressArticleMeta post={post} />
          <h1 className="max-w-[9.4ch] pt-5 font-[family-name:var(--font-darker-grotesque)] text-[3.2rem] font-bold leading-[0.9] tracking-[-0.048em] text-white sm:text-[4rem] lg:text-[4.65rem] xl:text-[5.1rem]">
            {post.title}
          </h1>
        </div>

        <div className="relative min-h-[30rem] overflow-hidden border border-white/10">
          {post.coverImage.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(135,182,255,0.22),transparent_40%),linear-gradient(180deg,#151515_0%,#050505_100%)]" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.34)_100%)]" />
        </div>
      </div>
    </section>
  )
}

function EditorialRailHero({ post }: { post: PressPost }) {
  return (
    <section className="px-5 pt-[8svh] md:px-10 lg:px-[5vw] lg:pt-[12svh]">
      <div className="mx-auto grid max-w-[1480px] gap-6 lg:grid-cols-[170px_minmax(0,1fr)_320px] lg:items-end lg:gap-8 xl:grid-cols-[180px_minmax(0,1fr)_330px]">
        <div className="hidden h-full border-l border-white/12 pl-4 lg:flex lg:flex-col lg:justify-between">
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-white/34">
            Editorial rail
          </div>
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/34">
            {post.layout}
          </div>
        </div>

        <div className="border border-white/10 bg-[#060606] p-6 md:p-8 lg:px-10 lg:py-9 xl:px-12">
          <PressArticleMeta post={post} />
          <h1 className="max-w-[10.2ch] pt-6 font-[family-name:var(--font-darker-grotesque)] text-[3.2rem] font-bold leading-[0.9] tracking-[-0.048em] text-white sm:text-[4.05rem] lg:text-[5.15rem] xl:text-[5.55rem]">
            {post.title}
          </h1>
        </div>

        <div className="relative min-h-[20rem] overflow-hidden border border-white/10 lg:mb-8 lg:translate-y-8">
          {post.coverImage.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 340px"
            />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(135,182,255,0.24),transparent_40%),linear-gradient(180deg,#111_0%,#050505_100%)]" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.3)_100%)]" />
        </div>
      </div>
    </section>
  )
}

export default function PressArticlePage({ post }: { post: PressPost }) {
  if (!post) {
    notFound()
  }

  const layout: PressLayout = post.layout || 'splitHero'

  if (layout === 'immersiveReveal') {
    return <ImmersiveRevealArticle post={post} />
  }

  return (
    <article className="min-h-screen bg-[#050505]">
      {layout === 'splitHero' ? (
        <>
          <SplitHero post={post} />
          <section className="px-5 py-14 md:px-10 md:py-18 lg:px-[5vw] lg:py-22">
            <PressArticleSlab post={post} />
          </section>
        </>
      ) : null}

      {layout === 'editorialRail' ? (
        <>
          <EditorialRailHero post={post} />
          <section className="px-5 py-14 md:px-10 md:py-18 lg:px-[5vw] lg:py-22">
            <PressArticleSlab post={post} />
          </section>
        </>
      ) : null}
    </article>
  )
}
