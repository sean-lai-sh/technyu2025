import React from 'react'
import { programs, contacts, about } from '@/lib/consts'
import Image from 'next/image'
import FooterSignalField from './FooterSignalField'

const Footer = () => {
  const linkGroups = [
    { title: 'About', items: about.map((item) => ({ name: item.name, href: item.href })) },
    { title: 'Programs', items: programs.map((program) => ({ name: program.name, href: program.href })) },
    { title: 'Contact', items: contacts.map(([name, href]) => ({ name, href })) },
  ]

  return (
    <section className="w-full overflow-hidden bg-[#030303] text-[#FFFFFF]">
      <div className="relative min-h-[100svh] w-full border-y border-white/10 bg-[linear-gradient(180deg,#0b0b0b_0%,#060606_68%,#020202_100%)] lg:h-[100vh] lg:min-h-0">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] bg-[linear-gradient(90deg,rgba(3,3,3,0),rgba(3,3,3,0.38)_10%,rgba(3,3,3,0.78)_36%,rgba(3,3,3,0.98)_100%)] lg:block" />
        <div className="relative z-10 grid min-h-[100svh] grid-rows-[auto_1fr_auto] px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-6 lg:h-full lg:min-h-0 lg:px-8 lg:pb-10 lg:pt-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.92fr)] lg:items-start lg:gap-0">
            <div className="relative min-h-0">
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.18),rgba(255,255,255,0))] lg:hidden" />
              <div className="relative h-12 w-40 md:h-20 md:w-60">
                <Image src="/logo.svg" alt="Technyu Logo" fill style={{ objectFit: 'contain' }} priority />
              </div>
            </div>
            <div className="relative lg:justify-self-end lg:pt-2">
              <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:gap-x-10">
                {linkGroups.map((group) => (
                  <div key={group.title} className="min-w-0 space-y-3">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/54">{group.title}</h3>
                    <div className="flex flex-col gap-2.5">
                      {group.items.map((item) => (
                        <FooterAnchor key={item.name} name={item.name} href={item.href} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative flex min-h-[34svh] items-end lg:min-h-0">
            <FooterSignalField className="pointer-events-none h-[44svh] w-full max-w-[44rem] opacity-[0.74] sm:h-[48svh] sm:max-w-[48rem] lg:h-[38vh] lg:max-w-[36rem]" />
          </div>
          <div className="pt-8 lg:ml-auto lg:w-[39%]">
            <div className="space-y-3 border-t border-white/10 pt-4 font-[family-name:var(--font-satoshi)] text-xs text-white/48 sm:text-[13px]">
              <p>© 2025 Tech@NYU. All rights reserved.</p>
              <p className="text-white/42">Made by Jennifer Huang and Sean Lai 2025.</p>
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
      className="font-[family-name:var(--font-satoshi)] text-sm text-white/72 transition-colors duration-200 hover:text-white sm:text-[15px]"
      {...rest}
    >
      {name}
    </a>
  )
}

export default Footer
