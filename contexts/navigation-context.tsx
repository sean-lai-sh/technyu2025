'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

type ScrollDirection = 'up' | 'down' | null

interface NavigationContextValue {
  scrollDirection: ScrollDirection
  isNavbarVisible: boolean
  lastScrollY: number
}

const NavigationContext = createContext<NavigationContextValue | null>(null)

interface NavigationProviderProps {
  children: ReactNode
}

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const scrollDifference = Math.abs(currentScrollY - lastScrollY)

    // Only trigger if scroll difference is significant (more than 5px)
    if (scrollDifference < 5) return

    if (currentScrollY < lastScrollY) {
      setScrollDirection('up')
      setIsNavbarVisible(true)
    } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setScrollDirection('down')
      setIsNavbarVisible(false)
    }

    setLastScrollY(currentScrollY)
  }, [lastScrollY])

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const debouncedScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(handleScroll, 50)
    }

    window.addEventListener('scroll', debouncedScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', debouncedScroll)
      clearTimeout(scrollTimeout)
    }
  }, [handleScroll])

  return (
    <NavigationContext.Provider value={{ scrollDirection, isNavbarVisible, lastScrollY }}>
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
