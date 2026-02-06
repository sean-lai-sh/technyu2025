import { NavigationProvider } from '@/contexts/navigation-context'
import { ReactNode } from 'react'

interface TeamLayoutProps {
  children: ReactNode
}

export default function TeamLayout({ children }: TeamLayoutProps) {
  return (
    <NavigationProvider>
      {children}
    </NavigationProvider>
  )
}
