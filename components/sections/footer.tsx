import React from 'react'
import { programs, contacts, about } from '@/lib/consts'
import FooterSignalField from './FooterSignalField'

const Footer = () => {
  const linkGroups = [
    { title: 'About', items: about.map((item) => ({ name: item.name, href: item.href })) },
    { title: 'Programs', items: programs.map((program) => ({ name: program.name, href: program.href })) },
    { title: 'Contact', items: contacts.map(([name, href]) => ({ name, href })) },
  ]

  return (
    <section className="w-full overflow-hidden bg-surface-base text-[#FFFFFF]">
      <div className="relative w-full overflow-hidden border-y border-white/10 bg-[linear-gradient(180deg,#0b0b0b_0%,#060606_68%,#020202_100%)]">
        {/* Capped-height layer. On lg the globe fills it as a full-height
            background and the text overlays on top; below lg it's a simple stack. */}
        <div className="relative z-10 flex flex-col lg:block lg:h-[clamp(460px,58svh,560px)]">
          {/* right-side fade keeps the link column legible over the globe */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] hidden w-[54%] bg-[linear-gradient(90deg,rgba(3,3,3,0),rgba(3,3,3,0.38)_10%,rgba(3,3,3,0.78)_36%,rgba(3,3,3,0.98)_100%)] lg:block" />

          {/* ASCII globe — in flow on mobile, full-height background on desktop */}
          <div className="relative order-2 mt-10 h-[clamp(300px,50svh,440px)] px-4 sm:mt-12 sm:h-[clamp(440px,52svh,520px)] sm:px-6 lg:absolute lg:inset-0 lg:z-0 lg:order-none lg:mt-0 lg:h-auto lg:px-0">
            <FooterSignalField className="pointer-events-none h-full w-full max-w-[64rem] opacity-[0.74] lg:max-w-[56rem]" />
          </div>

          {/* mobile top hairline */}
          <div className="order-1 mx-4 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.18),rgba(255,255,255,0))] sm:mx-6 lg:hidden" />

          {/* link columns — top-right */}
          <div className="order-1 mt-6 flex justify-start px-4 sm:px-6 lg:absolute lg:right-8 lg:top-8 lg:z-10 lg:mt-0 lg:justify-end lg:px-0">
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:gap-x-10">
              {linkGroups.map((group) => (
                <div key={group.title} className="min-w-0 space-y-3">
                  <h3 className="text-[12px] font-semibold uppercase tracking-[0.28em] text-white/48 sm:text-[13px]">{group.title}</h3>
                  <div className="flex flex-col gap-2.5">
                    {group.items.map((item) => (
                      <FooterAnchor key={item.name} name={item.name} href={item.href} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* copyright — bottom-right */}
          <div className="order-3 mt-10 px-4 pb-6 sm:px-6 sm:pb-8 lg:absolute lg:bottom-8 lg:right-8 lg:z-10 lg:mt-0 lg:w-[39%] lg:px-0 lg:pb-0">
            <div className="space-y-2 border-t border-white/10 pt-4 font-[family-name:var(--font-inter)] text-xs text-white/48 sm:text-[13px]">
              <p>© 2025 Tech@NYU. All rights reserved.</p>
              <p className="text-white/28">Made by Jennifer Huang and Sean Lai 2025.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type FooterAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    name: string;
    href?: string;
};

const FooterAnchor: React.FC<FooterAnchorProps> = ({ name, href, ...rest }) => {
  return (
    <a
      href={href ? href : '#'}
      className="font-[family-name:var(--font-inter)] text-[15px] text-white/72 transition-colors duration-200 hover:text-white sm:text-[17px]"
      {...rest}
    >
      {name}
    </a>
  )
}

export default Footer
