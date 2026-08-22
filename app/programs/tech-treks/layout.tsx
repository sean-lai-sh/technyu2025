import type { ReactNode } from 'react'

/**
 * Tech Treks program layout.
 * Strips the default top-padding wrapper so the bespoke cinematic hero
 * can control its own spacing without fighting DynamicProgramPage.
 */
export default function TechTreksLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
