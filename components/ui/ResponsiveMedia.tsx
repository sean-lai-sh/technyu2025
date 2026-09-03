'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface Props {
  src: string
  alt?: string
  className?: string
}

export default function ResponsiveMedia({ src, alt = '', className = '' }: Props) {
  const [isPortrait, setIsPortrait] = useState<boolean | null>(null)

  useEffect(() => {
    let mounted = true
    const img = new window.Image()
    img.src = src
    img.onload = () => {
      if (!mounted) return
      const { naturalWidth, naturalHeight } = img
      setIsPortrait(naturalHeight > naturalWidth)
    }
    img.onerror = () => {
      if (!mounted) return
      setIsPortrait(false)
    }
    return () => { mounted = false }
  }, [src])

  // If unknown size yet, render centered constrained placeholder
  if (isPortrait === null) {
    return (
      <div className={`mx-auto max-w-3xl ${className}`}>
        <div className="w-full h-48 bg-surface-raised" />
      </div>
    )
  }

  if (isPortrait) {
    // Portrait images capped to max 20svw, left-aligned within the content column
    return (
      <div className={`${className} max-w-[20svw]`}>
        <Image
          src={src}
          alt={alt}
          width={300}
          height={450}
          className="object-contain block max-w-[20svw] w-auto h-auto"
        />
      </div>
    )
  }

  // Landscape or square: constrain by max-w-3xl and left-align
  return (
    <div className={`max-w-3xl ${className}`}>
        {/* Preserve authored dimensions for arbitrary CMS media URLs. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="w-auto max-w-full block max-h-[50svh]" />
    </div>
  )
}
