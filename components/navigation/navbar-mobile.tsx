import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

type NavLink = {
  title: string
  href: string
  external?: boolean
}

type NavbarMobileProps = {
  headerHeight: number
  primaryLinks: NavLink[]
  programLinks: NavLink[]
  setIsActive: (active: boolean) => void
}

const sheetEase = [0.76, 0, 0.24, 1] as [number, number, number, number]
const hueEase = [0.16, 1, 0.3, 1] as [number, number, number, number]

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
      transition={{ duration: 0.48 }}
      className="fixed inset-x-0 z-[95] md:hidden"
      style={{
        top: headerHeight,
        height: `calc(100svh - ${headerHeight}px)`,
      }}
    >
      <motion.div
        initial={{
          y: -34,
          opacity: 0.72,
          clipPath: 'inset(0 0 100% 0)',
          scaleY: 0.985,
        }}
        animate={{
          y: 0,
          opacity: 1,
          clipPath: 'inset(0 0 0% 0)',
          scaleY: 1,
        }}
        exit={{
          y: -34,
          opacity: 0,
          clipPath: 'inset(0 0 100% 0)',
          scaleY: 0.985,
        }}
        transition={{
          y: { duration: 0.78, ease: sheetEase },
          opacity: { duration: 0.34, delay: 0.08 },
          clipPath: { duration: 0.82, ease: sheetEase },
          scaleY: { duration: 0.78, ease: sheetEase },
        }}
        style={{ transformOrigin: 'top center' }}
        className="flex h-full flex-col overflow-hidden border-b border-white/10 bg-surface-base"
      >
        <div className="relative h-[3px] overflow-hidden">
          <motion.div
            initial={{ scaleX: 0.015, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0.08, opacity: 0 }}
            transition={{
              duration: 3,
              ease: [0.19, 1, 0.22, 1],
              delay: 0.12,
            }}
            style={{ transformOrigin: 'center center' }}
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(179,0,255,0),rgba(179,0,255,0.78),rgba(77,255,148,0.60),rgba(77,255,148,0))]"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          <motion.nav
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.62, ease: sheetEase, delay: 0.12 }}
            className="flex min-h-full flex-col justify-between px-4 pb-3 pt-3"
          >
            <div className="space-y-1">
              {primaryLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  onClick={closeSheet}
                  className="group flex items-center justify-between border-b border-white/10 py-3 text-white transition-colors duration-300 hover:text-[#4DFF94]"
                >
                  <span className="font-[family-name:var(--font-hk-grotesque)] text-[2rem] font-semibold leading-none tracking-tight sm:text-[2.15rem]">
                    {link.title}
                  </span>
                  <ArrowUpRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>

            <div className="mt-6 border border-white/10 bg-white/5">
              <div className="border-b border-white/10 px-4 py-2.5">
                <p className="font-[family-name:var(--font-inter)] text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/28">
                  Programs
                </p>
              </div>
              <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-1">
                {programLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeSheet}
                    className="bg-surface-base px-3 py-3 font-[family-name:var(--font-hk-grotesque)] text-[1.05rem] tracking-normal text-white/72 transition-colors duration-300 hover:text-[#B300FF] sm:px-4 sm:py-3.5 sm:text-[1.2rem]"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          </motion.nav>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3">
          <Link
            href="mailto:hello@techatnyu.org"
            onClick={closeSheet}
            className="font-[family-name:var(--font-inter)] text-[0.68rem] uppercase tracking-[0.18em] text-white/48 transition-colors duration-300 hover:text-white"
          >
            hello@techatnyu.org
          </Link>
          <span className="font-[family-name:var(--font-inter)] text-[0.62rem] uppercase tracking-[0.2em] text-white/28">
            NYC / EST. 2009
          </span>
        </div>
      </motion.div>
    </motion.aside>
  )
}

export default NavbarMobile
