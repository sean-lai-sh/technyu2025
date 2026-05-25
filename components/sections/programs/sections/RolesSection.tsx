'use client'
import React from 'react'
import { RolesSection } from '@/lib/types'
import RoleCard from '@/components/ui/role-card'

interface RolesSectionProps {
  section: RolesSection
  programApply?: {
    status?: boolean
    link?: string
    ctaLabel?: string
  }
}

export default function RolesSectionComponent({ section, programApply }: RolesSectionProps) {
  return (
    <section className="mt-18 px-[5vw] pb-[5svh]">
      <div className="mx-auto max-w-[1240px]">
        <h2 className="mb-6 font-[family-name:var(--font-satoshi)] text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
          {section.heading}
        </h2>

        {section.intro && (
          <p className="mb-8 max-w-[72ch] text-base leading-relaxed text-white/90 md:text-lg">
            {section.intro}
          </p>
        )}

        {/* Pre-roles content blocks */}
        {section.preRolesContent && section.preRolesContent.length > 0 && (
          <div className="mb-10 space-y-4 rounded-2xl border border-white/10 bg-surface-base p-5 md:p-6">
            {section.preRolesContent.map((block) => {
              if (block.type === 'subheading') {
                return (
                  <h3
                    key={block._key}
                    className="font-[family-name:var(--font-satoshi)] text-3xl font-semibold leading-tight text-white"
                  >
                    {block.text}
                  </h3>
                )
              }
              if (block.type === 'paragraph') {
                return (
                  <p key={block._key} className="max-w-[72ch] text-base leading-relaxed text-white/90 md:text-lg">
                    {block.text}
                  </p>
                )
              }
              if (block.type === 'contact' && block.link) {
                return (
                  <p key={block._key} className="max-w-[72ch] text-base leading-relaxed text-white/90 md:text-lg">
                    {block.text}{' '}
                    <a
                      href={block.link}
                      className="font-semibold text-[#4DFF94] hover:underline"
                    >
                      {block.link.replace('mailto:', '')}
                    </a>
                  </p>
                )
              }
              return null
            })}
          </div>
        )}

        {section.rolesIntro && (
          <p className="mb-8 max-w-[72ch] text-base leading-relaxed text-white/90 md:text-lg">
            {section.rolesIntro}
          </p>
        )}

        {/* Role cards */}
        <div
          className={`grid gap-8 ${
            section.roles.length === 1
              ? 'grid-cols-1 max-w-2xl'
              : section.roles.length === 2
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-1 md:grid-cols-2'
          }`}
        >
          {section.roles.map((role) => {
            // Determine application status for this role
            // role.isOpen takes priority - if explicitly false, role is closed
            // Otherwise, role-specific link or program-level settings determine status
            const roleApplicationLink = role.applicationLink || programApply?.link

            return (
              <RoleCard
                key={role._key}
                title={role.title}
                description={role.description}
                benefits={role.benefits}
                buttonText={role.buttonText}
                color={role.color}
                applicationsOpen={role.isOpen ? true : false}
                applicationLink={roleApplicationLink}
              />
            )
          })}
        </div>

        {/* Footer */}
        {(section.footer || section.footerContact) && (
          <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-5 text-center">
            {section.footer && (
              <p className="mb-3 text-base text-white/72 md:text-lg">{section.footer}</p>
            )}
            {section.footerContact && (
              <p className="text-base md:text-lg">
                <a
                  href={section.footerContact.href}
                  className="font-semibold text-[#4DFF94] hover:underline"
                >
                  {section.footerContact.label}
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
