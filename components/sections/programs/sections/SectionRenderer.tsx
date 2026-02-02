'use client'
import React from 'react'
import { ProgramSection } from '@/lib/types'
import TextSectionComponent from './TextSection'
import StickyScrollSectionComponent from './StickyScrollSection'
import RolesSectionComponent from './RolesSection'
import FaqSectionComponent from './FaqSection'
import LogoSliderSectionComponent from './LogoSliderSection'
import CtaSectionComponent from './CtaSection'

interface SectionRendererProps {
  sections: ProgramSection[]
  programApply?: {
    status?: boolean
    link?: string
    ctaLabel?: string
  }
}

export default function SectionRenderer({ sections, programApply }: SectionRendererProps) {
  if (!sections || sections.length === 0) return null

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'textSection':
            return <TextSectionComponent key={section._key} section={section} />
          case 'stickyScrollSection':
            return <StickyScrollSectionComponent key={section._key} section={section} />
          case 'rolesSection':
            return (
              <RolesSectionComponent
                key={section._key}
                section={section}
                programApply={programApply}
              />
            )
          case 'faqSection':
            return <FaqSectionComponent key={section._key} section={section} />
          case 'logoSliderSection':
            return <LogoSliderSectionComponent key={section._key} section={section} />
          case 'ctaSection':
            return (
              <CtaSectionComponent
                key={section._key}
                section={section}
                programApply={programApply}
              />
            )
          default:
            return null
        }
      })}
    </>
  )
}
