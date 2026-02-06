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
    <section className="mt-16 px-[5vw] pb-[5svh]">
      <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-left mb-8">
        {section.heading}
      </h2>

      {section.intro && (
        <p className="text-white text-lg md:text-xl mb-8 max-w-3xl">{section.intro}</p>
      )}

      {/* Pre-roles content blocks */}
      {section.preRolesContent && section.preRolesContent.length > 0 && (
        <div className="mb-8 space-y-4">
          {section.preRolesContent.map((block) => {
            if (block.type === 'subheading') {
              return (
                <h3
                  key={block._key}
                  className="text-white text-2xl md:text-3xl font-semibold"
                >
                  {block.text}
                </h3>
              )
            }
            if (block.type === 'paragraph') {
              return (
                <p key={block._key} className="text-white text-lg md:text-xl">
                  {block.text}
                </p>
              )
            }
            if (block.type === 'contact' && block.link) {
              return (
                <p key={block._key} className="text-white text-lg md:text-xl">
                  {block.text}{' '}
                  <a
                    href={block.link}
                    className="text-green-500 hover:underline font-bold"
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
        <p className="text-white text-lg md:text-xl mb-8">{section.rolesIntro}</p>
      )}

      {/* Role cards */}
      <div
        className={`grid gap-8 lg:gap-12 ${
          section.roles.length === 1
            ? 'grid-cols-1 max-w-2xl'
            : section.roles.length === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
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
        <div className="mt-12 text-center">
          {section.footer && (
            <p className="text-white text-lg md:text-xl mb-4">{section.footer}</p>
          )}
          {section.footerContact && (
            <p className="text-white text-lg md:text-xl">
              <a
                href={section.footerContact.href}
                className="text-green-500 hover:underline font-bold"
              >
                {section.footerContact.label}
              </a>
            </p>
          )}
        </div>
      )}
    </section>
  )
}
