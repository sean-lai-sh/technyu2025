import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

type NavLink = {
  title: string
  href: string
}

type NavbarMobileProps = {
  headerHeight: number
  primaryLinks: NavLink[]
  programLinks: NavLink[]
  setIsActive: (active: boolean) => void
}

const sheetEase = [0.76, 0, 0.24, 1] as [number, number, number, number]

const NavbarMobile = ({
  headerHeight,
  primaryLinks,
  programLinks,
  setIsActive,
}: NavbarMobileProps) => {
  const closeSheet = () => setIsActive(false)

  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-x-0 z-[95] md:hidden"
      style={{
        top: headerHeight,
        height: `calc(100svh - ${headerHeight}px)`,
      }}
    >
      <motion.div
        initial={{ y: '-4%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '-3%', opacity: 0 }}
        transition={{ duration: 0.6, ease: sheetEase }}
        className="flex h-full flex-col border-b border-white/12 bg-[#040404]"
      >
        <div className="h-px w-full bg-[linear-gradient(90deg,rgba(109,94,252,0),rgba(109,94,252,0.9),rgba(126,247,165,0.6),rgba(126,247,165,0))]" />

        <div className="border-b border-white/10 px-4 py-4">
          <p className="font-[family-name:var(--font-inter)] text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-white/45">
            Navigation
          </p>
          <p className="mt-2 font-[family-name:var(--font-darker-grotesque)] text-[1.1rem] uppercase tracking-[0.14em] text-white/72">
            Student-led technical system
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="flex min-h-full flex-col justify-between px-4 pb-5 pt-4">
            <div className="space-y-2">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeSheet}
                  className="group flex items-center justify-between border-b border-white/10 py-4 text-white transition-colors duration-300 hover:text-[#7ef7a5]"
                >
                  <span className="font-[family-name:var(--font-darker-grotesque)] text-[2.25rem] font-semibold uppercase leading-none tracking-[0.06em]">
                    {link.title}
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>

            <div className="mt-10 border border-white/10 bg-white/[0.02]">
              <div className="border-b border-white/10 px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/38">
                  Programs
                </p>
              </div>
              <div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2">
                {programLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeSheet}
                    className="bg-[#040404] px-4 py-4 font-[family-name:var(--font-darker-grotesque)] text-[1.35rem] uppercase tracking-[0.08em] text-white/82 transition-colors duration-300 hover:text-[#6d5efc]"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-4">
          <Link
            href="mailto:hello@techatnyu.org"
            onClick={closeSheet}
            className="font-[family-name:var(--font-inter)] text-[0.75rem] uppercase tracking-[0.2em] text-white/55 transition-colors duration-300 hover:text-white"
          >
            hello@techatnyu.org
          </Link>
          <span className="font-[family-name:var(--font-inter)] text-[0.68rem] uppercase tracking-[0.24em] text-white/28">
            NYC / EST. 2013
          </span>
        </div>
      </motion.div>
    </motion.aside>
  )
}

export default NavbarMobile
