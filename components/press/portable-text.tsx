import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  PressPortableText,
  PressPortableTextImageBlock,
  PressPortableTextLinkMark,
  PressPortableTextMarkDef,
  PressPortableTextTextBlock,
} from '@/lib/types'

function renderMarkedText(
  text: string,
  marks: string[] | undefined,
  markDefs: PressPortableTextMarkDef[] | undefined,
) {
  if (!marks || marks.length === 0) {
    return text
  }

  return marks.reduce<React.ReactNode>((content, mark) => {
    if (mark === 'strong') {
      return <strong key={`strong-${mark}`}>{content}</strong>
    }

    if (mark === 'em') {
      return <em key={`em-${mark}`}>{content}</em>
    }

    const markDef = markDefs?.find((definition) => definition._key === mark)

    if (markDef?._type === 'highlight') {
      const colorClass = markDef.color === 'blue' ? 'text-[#87B6FF]' : 'text-[#6DFFA8]'
      return (
        <span key={mark} className={`font-semibold ${colorClass}`}>
          {content}
        </span>
      )
    }

    if (markDef?._type === 'link') {
      const href = (markDef as PressPortableTextLinkMark).href || '#'
      const isInternal = href.startsWith('/')

      if (isInternal) {
        return (
          <Link
            key={mark}
            href={href}
            className="font-semibold text-[#87B6FF] underline decoration-white/24 underline-offset-4 transition-colors hover:text-white"
          >
            {content}
          </Link>
        )
      }

      return (
        <a
          key={mark}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="font-semibold text-[#87B6FF] underline decoration-white/24 underline-offset-4 transition-colors hover:text-white"
        >
          {content}
        </a>
      )
    }

    return content
  }, text)
}

function PressTextBlock({ block }: { block: PressPortableTextTextBlock }) {
  const children = block.children?.map((child) => (
    <React.Fragment key={child._key}>
      {renderMarkedText(child.text, child.marks, block.markDefs)}
    </React.Fragment>
  ))

  switch (block.style) {
    case 'h2':
      return (
        <h2 className="pt-8 font-[family-name:var(--font-satoshi)] text-3xl font-bold leading-none tracking-[-0.04em] text-white md:text-4xl">
          {children}
        </h2>
      )
    case 'h3':
      return (
        <h3 className="pt-8 font-[family-name:var(--font-satoshi)] text-2xl font-bold leading-none tracking-[-0.03em] text-white md:text-[2rem]">
          {children}
        </h3>
      )
    case 'blockquote':
      return (
        <blockquote className="my-8 border-l-2 border-white/20 pl-5 text-[1.08rem] italic leading-8 text-white/90 md:text-[1.15rem]">
          {children}
        </blockquote>
      )
    default:
      return (
        <p className="max-w-[72ch] text-[1.03rem] leading-8 text-white/72 md:text-[1.08rem]">
          {children}
        </p>
      )
  }
}

function PressImageBlock({ block }: { block: PressPortableTextImageBlock }) {
  if (!block.imageUrl) return null

  return (
    <figure className="my-10 overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={block.imageUrl}
          alt={block.alt || block.caption || 'Blog image'}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 920px"
        />
      </div>
      {block.caption ? (
        <figcaption className="border-t border-white/10 px-5 py-4 text-sm leading-6 text-white/48">
          {block.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

export default function PressPortableTextRenderer({ value }: { value: PressPortableText }) {
  if (!value || value.length === 0) return null

  return (
    <>
      {value.map((block) => {
        if (block._type === 'image') {
          return <PressImageBlock key={block._key} block={block} />
        }

        return <PressTextBlock key={block._key} block={block} />
      })}
    </>
  )
}
