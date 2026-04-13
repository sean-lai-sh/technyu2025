import Link from 'next/link'
import { RolesSection } from '@/lib/types'

type ProgramRolesSectionProps = {
  rolesSection: RolesSection
}

export default function ProgramRolesSection({ rolesSection }: ProgramRolesSectionProps) {
  return (
    <section className="px-[5vw] lg:px-[8vw] py-[10svh] border-t border-[#EDEDED]/8">
      <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.15em] uppercase opacity-55 mb-4">
        Open Roles
      </p>
      <h2
        className="font-[family-name:var(--font-darker-grotesque)] font-medium text-[#EDEDED] mb-14"
        style={{ fontSize: 'clamp(40px, 6vw, 68px)', letterSpacing: '-1.2px' }}
      >
        {rolesSection.heading}
      </h2>

      {rolesSection.preRolesContent && rolesSection.preRolesContent.length > 0 && (
        <div className="mb-10 space-y-3 max-w-2xl">
          {rolesSection.preRolesContent.map((block) => {
            if (block.type === 'subheading') {
              return (
                <h3 key={block._key} className="font-[family-name:var(--font-darker-grotesque)] font-medium text-[#EDEDED] text-2xl">
                  {block.text}
                </h3>
              )
            }

            if (block.type === 'paragraph') {
              return (
                <p key={block._key} className="font-[family-name:var(--font-inter)] text-[16px] text-[#EDEDED]/68 leading-relaxed">
                  {block.text}
                </p>
              )
            }

            if (block.type === 'contact' && block.link) {
              return (
                <p key={block._key} className="font-[family-name:var(--font-inter)] text-[16px] text-[#EDEDED]/68">
                  {block.text}{' '}
                  <a href={block.link} className="text-[#4DFF94] hover:underline font-semibold">
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
            ? { boxShadow: 'inset 0px 0px 150px rgba(179, 0, 255, 0.4)' }
            : { boxShadow: 'inset 0px 0px 150px rgba(77, 255, 148, 0.4)' }
          const accentColor = isPurple ? '#B300FF' : '#4DFF94'

          return (
            <div key={role._key} className="p-8 border border-[#EDEDED] bg-black" style={glowStyle}>
              <h3
                className="font-[family-name:var(--font-darker-grotesque)] font-medium text-[#EDEDED] mb-2"
                style={{ fontSize: 'clamp(28px, 3vw, 42px)', letterSpacing: '-0.8px' }}
              >
                {role.title}
              </h3>
              <div className="w-12 h-0.5 mb-6" style={{ background: accentColor, boxShadow: `0 0 10px ${accentColor}` }} />
              <p className="font-[family-name:var(--font-inter)] text-[15px] leading-relaxed text-[#EDEDED]/68 mb-6">
                {role.description}
              </p>
              <div className="space-y-2 mb-8">
                {role.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-start gap-3">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accentColor }} />
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#EDEDED]/62 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mb-5">
                <span
                  className={`w-2 h-2 rounded-full ${role.isOpen ? 'bg-[#4DFF94]' : 'bg-red-500'}`}
                  style={role.isOpen ? { boxShadow: '0 0 6px #4DFF94' } : undefined}
                />
                <span className="font-[family-name:var(--font-inter)] text-[12px] font-medium tracking-[0.12em] uppercase opacity-65">
                  {role.isOpen ? 'Applications Open' : 'Applications Closed'}
                </span>
              </div>
              {role.isOpen && role.applicationLink && (
                <Link
                  href={role.applicationLink}
                  className="font-[family-name:var(--font-inter)] font-semibold text-[13px] inline-block px-6 py-3 border border-[#EDEDED] text-[#EDEDED] hover:bg-[#EDEDED] hover:text-black transition-all duration-500 tracking-widest uppercase"
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
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-[#EDEDED]/55 mb-3">{rolesSection.footer}</p>
          )}
          {rolesSection.footerContact && (
            <a href={rolesSection.footerContact.href} className="font-[family-name:var(--font-inter)] text-[15px] font-semibold text-[#4DFF94] hover:underline">
              {rolesSection.footerContact.label}
            </a>
          )}
        </div>
      )}
    </section>
  )
}
