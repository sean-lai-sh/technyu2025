'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigation } from '@/contexts/navigation-context'

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
  const { isNavbarVisible, headerHeight } = useNavigation()

  const stickyOffset = isNavbarVisible ? headerHeight : 0

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }))

      // Bias the trigger line below the fixed header so the active state matches the visible section.
      const scrollPosition = window.scrollY + stickyOffset + window.innerHeight * 0.22

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
  }, [stickyOffset])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -(stickyOffset + 24)
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <nav
      className="relative min-h-screen pl-6 pt-[5vh]"
      style={{
        position: 'sticky',
        top: stickyOffset,
        transition: 'top 650ms cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      {/* Vertical line extends into the LinkedIn header strip above the content rail */}
      <div
        className="absolute left-0 w-[2px] bg-gray-800"
        style={{
          top: '-5vh',
          height: 'calc(100% + 5vh)',
        }}
      />
      <div className="space-y-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`relative block w-full text-left transition-colors ${
              activeSection === section.id
                ? 'text-white font-medium'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {activeSection === section.id && (
              <motion.span
                layoutId="timeline-active-square"
                className="absolute left-[-28px] top-1/2 h-2 w-2 -translate-y-1/2 bg-white"
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            )}
            <span className="text-sm md:text-2xl uppercase tracking-wide">{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
