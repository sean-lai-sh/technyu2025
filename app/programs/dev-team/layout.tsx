import type { ReactNode } from 'react'

/**
 * Dev Team program layout.
 * Strips the default top-padding wrapper so ProgramShowcasePageClient
 * can control its own hero spacing without fighting DynamicProgramPage.
 */
export default function DevTeamLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
