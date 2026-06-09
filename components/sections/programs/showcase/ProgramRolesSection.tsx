import Link from 'next/link'
import { RolesSection } from '@/lib/types'

type ProgramRolesSectionProps = {
  rolesSection: RolesSection
}

export default function ProgramRolesSection({ rolesSection }: ProgramRolesSectionProps) {
  return (
    <section className="px-[5vw] lg:px-[8vw] py-[10svh] border-t border-white/10">
      <p className="font-[family-name:var(--font-inter)] text-[12px] font-semibold tracking-[0.22em] uppercase text-white/48 mb-4">
        Open Roles
      </p>
      <h2 className="text-display-2 text-white mb-14">
        {rolesSection.heading}
      </h2>

      {rolesSection.preRolesContent && rolesSection.preRolesContent.length > 0 && (
        <div className="mb-10 space-y-3 max-w-2xl">
          {rolesSection.preRolesContent.map((block) => {
            if (block.type === 'subheading') {
              return (
                <h3 key={block._key} className="text-heading-1 text-white">
                  {block.text}
                </h3>
              )
            }

            if (block.type === 'paragraph') {
              return (
                <p key={block._key} className="font-[family-name:var(--font-inter)] text-[16px] text-white/72 leading-relaxed">
                  {block.text}
                </p>
              )
            }

            if (block.type === 'contact' && block.link) {
              return (
                <p key={block._key} className="font-[family-name:var(--font-inter)] text-[16px] text-white/72">
                  {block.text}{' '}
                  <a href={block.link} className="text-accent-green hover:underline font-semibold">
                    {block.link.replace('mailto:', '')}
                  </a>
                </p>
              )
            }

            return null
          })}
        </div>
      )}

      <div className={`grid gap-6 ${rolesSection.roles.length === 1 ? 'grid-cols-1 max-w-2xl' : 'grid-cols-1 md:grid-cols-2'}`}>
        {rolesSection.roles.map((role, index) => {
          const isPurple = index % 2 === 0
          const glowStyle = isPurple
            ? { boxShadow: 'inset 0 0 80px rgba(179, 0, 255, 0.16)' }
            : { boxShadow: 'inset 0 0 80px rgba(77, 255, 148, 0.16)' }
          const accentColor = isPurple ? '#B300FF' : '#4DFF94'

          return (
            <div key={role._key} className="p-8 border border-white/10 bg-surface-raised" style={glowStyle}>
              <h3 className="text-display-3 text-white mb-2">
                {role.title}
              </h3>
              <div className="w-12 h-0.5 mb-6" style={{ background: accentColor, boxShadow: `0 0 10px ${accentColor}` }} />
              <p className="font-[family-name:var(--font-inter)] text-[15px] leading-relaxed text-white/72 mb-6">
                {role.description}
              </p>
              <div className="space-y-2 mb-8">
                {role.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-start gap-3">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accentColor }} />
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/72 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-5">
                <span
                  className={`w-2 h-2 rounded-full ${role.isOpen ? 'bg-accent-green' : 'bg-red-500'}`}
                  style={role.isOpen ? { boxShadow: '0 0 6px #4DFF94' } : undefined}
                />
                <span className="font-[family-name:var(--font-inter)] text-[12px] font-semibold tracking-[0.22em] uppercase text-white/48">
                  {role.isOpen ? 'Applications Open' : 'Applications Closed'}
                </span>
              </div>
              {role.isOpen && role.applicationLink && (
                <Link
                  href={role.applicationLink}
                  className="font-[family-name:var(--font-inter)] font-semibold text-[13px] inline-block px-6 py-3 border border-white/70 text-white tracking-[0.16em] uppercase transition-colors [transition-duration:var(--motion-hover-in-duration)] [transition-timing-function:var(--motion-brand-enter)] hover:bg-white hover:text-surface-deep"
                >
                  {role.buttonText || 'Apply'}
                </Link>
              )}
            </div>
          )
        })}
      </div>

      {(rolesSection.footer || rolesSection.footerContact) && (
        <div className="mt-12">
          {rolesSection.footer && (
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/48 mb-3">{rolesSection.footer}</p>
          )}
          {rolesSection.footerContact && (
            <a href={rolesSection.footerContact.href} className="font-[family-name:var(--font-inter)] text-[15px] font-semibold text-accent-green hover:underline">
              {rolesSection.footerContact.label}
            </a>
          )}
        </div>
      )}
    </section>
  )
}
