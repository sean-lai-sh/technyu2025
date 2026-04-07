'use client'

import React, { useEffect, useState, useRef } from 'react'

interface TimelineSection {
  id: string
  label: string
}

const sections: TimelineSection[] = [
  { id: 'background', label: 'Background' },
  { id: 'about', label: 'About' },
]

export function TimelineNav() {
  const [activeSection, setActiveSection] = useState<string>('background')
  const [squarePosition, setSquarePosition] = useState<number>(0)
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }))

      // Use middle of viewport for more immediate switching
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i]
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Update square position when active section changes or window resizes
    const updateSquarePosition = () => {
      const activeButton = buttonRefs.current.get(activeSection)
      if (activeButton) {
        const buttonRect = activeButton.getBoundingClientRect()
        const navRect = activeButton.parentElement?.parentElement?.getBoundingClientRect()
        if (navRect) {
          // Position square at the vertical center of the active button
          const relativeTop = buttonRect.top - navRect.top + (buttonRect.height / 2) - 4 // -4 to center the 8px square
          setSquarePosition(relativeTop)
        }
      }
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateSquarePosition, 100)
    updateSquarePosition()
    
    window.addEventListener('resize', updateSquarePosition)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateSquarePosition)
    }
  }, [activeSection])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <nav className="relative pl-6 min-h-screen">
      {/* Vertical line - centered at left edge, spans full screen */}
      <div className="absolute left-0 top-0 h-screen w-[2px] bg-gray-800" />

      {/* Animated active indicator square */}
      <div 
        className="absolute left-[-4px] w-2 h-2 bg-white transition-all duration-300 ease-out"
        style={{ 
          transform: `translateY(${squarePosition}px)`
        }}
      />
      
      <div className="space-y-6">
        {sections.map((section) => (
          <button
            key={section.id}
            ref={(el) => {
              if (el) buttonRefs.current.set(section.id, el)
            }}
            onClick={() => scrollToSection(section.id)}
            className={`block text-left transition-colors w-full ${
              activeSection === section.id
                ? 'text-white font-medium'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <span className="text-sm md:text-2xl uppercase tracking-wide">{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
