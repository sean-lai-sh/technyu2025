'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react'
import { usePathname } from 'next/navigation'

export type ScrollDirection = 'up' | 'down' | null
export type HeaderMode = 'home-overlay' | 'default-collapsible'

interface NavigationContextValue {
  scrollDirection: ScrollDirection
  isNavbarVisible: boolean
  lastScrollY: number
  headerMode: HeaderMode
  headerHeight: number
  setHeaderHeight: (height: number) => void
}

const NavigationContext = createContext<NavigationContextValue | null>(null)

interface NavigationProviderProps {
  children: ReactNode
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const pathname = usePathname()
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [headerHeight, setHeaderHeightState] = useState(0)

  const lastScrollYRef = useRef(0)
  const headerHeightRef = useRef(0)
  const headerMode: HeaderMode = pathname === '/' ? 'home-overlay' : 'default-collapsible'

  const setHeaderHeight = useCallback((height: number) => {
    const nextHeight = Number.isFinite(height) ? Math.max(0, Math.round(height)) : 0

    headerHeightRef.current = nextHeight
    setHeaderHeightState((previousHeight) => (
      previousHeight === nextHeight ? previousHeight : nextHeight
    ))
  }, [])

  useEffect(() => {
    headerHeightRef.current = headerHeight
  }, [headerHeight])

  useEffect(() => {
    const currentScrollY = window.scrollY

    lastScrollYRef.current = currentScrollY
    setLastScrollY(currentScrollY)
    setScrollDirection(currentScrollY <= 8 ? 'up' : null)
    setIsNavbarVisible(true)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const previousScrollY = lastScrollYRef.current

      if (currentScrollY <= 8) {
        setScrollDirection('up')
        setIsNavbarVisible(true)
        lastScrollYRef.current = currentScrollY
        setLastScrollY(currentScrollY)
        return
      }

      const scrollDifference = Math.abs(currentScrollY - previousScrollY)
      if (scrollDifference < 5) {
        return
      }

      const hideThreshold = Math.max(64, Math.round(headerHeightRef.current * 0.75))

      if (currentScrollY > previousScrollY && currentScrollY > hideThreshold) {
        setScrollDirection('down')
        setIsNavbarVisible(false)
      } else if (currentScrollY < previousScrollY) {
        setScrollDirection('up')
        setIsNavbarVisible(true)
      }

      lastScrollYRef.current = currentScrollY
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  return (
    <NavigationContext.Provider
      value={{
        scrollDirection,
        isNavbarVisible,
        lastScrollY,
        headerMode,
        headerHeight,
        setHeaderHeight,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

/**
 * Hook to consume navigation context.
 * Throws if used outside of NavigationProvider.
 */
export const useNavigation = (): NavigationContextValue => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}

/**
 * Safe hook that returns context value or null if outside provider.
 * Use this in components that may render outside the provider (e.g., Navbar).
 */
export const useNavigationSafe = (): NavigationContextValue | null => {
  return useContext(NavigationContext)
}
