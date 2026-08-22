import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { motionTokens } from '@/lib/motion'

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

const NavbarMobile = ({
  headerHeight,
  primaryLinks,
  programLinks,
  setIsActive,
}: NavbarMobileProps) => {
  const closeSheet = () => setIsActive(false)

  return (
    <motion.aside
      initial={false}
      className="fixed inset-x-0 z-[95] md:hidden"
      style={{
        top: headerHeight,
        height: `calc(100svh - ${headerHeight}px)`,
      }}
    >
      {/* Veil — dims the page beneath so menu text stays readable.
          Sits behind the sheet so the wipe-down is still visible. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.48 }}
        className="absolute inset-0 bg-black/85 backdrop-blur-xl"
      />

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
          y: { duration: motionTokens.sheetDurationMs / 1000, ease: motionTokens.sheetEase },
          opacity: { duration: 0.34, delay: 0.08 },
          clipPath: { duration: 0.82, ease: motionTokens.sheetEase },
          scaleY: { duration: motionTokens.sheetDurationMs / 1000, ease: motionTokens.sheetEase },
        }}
        style={{ transformOrigin: 'top center' }}
        className="relative flex h-full flex-col overflow-hidden border-b border-white/10 bg-surface-base"
      >
        <div className="relative h-[3px] overflow-hidden">
          <motion.div
            initial={{ scaleX: 0.015, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0.08, opacity: 0 }}
            transition={{
              duration: 3,
              ease: motionTokens.brandEnterEase,
              delay: 0.12,
            }}
            style={{ transformOrigin: 'center center' }}
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(var(--accent-purple-rgb),0),rgba(var(--accent-purple-rgb),0.78),rgba(var(--accent-green-rgb),0.60),rgba(var(--accent-green-rgb),0))]"
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          <motion.nav
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.62, ease: motionTokens.sheetEase, delay: 0.12 }}
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
                  className="group flex items-center justify-between border-b border-white/10 py-3 text-white transition-colors duration-[var(--motion-hover-in-duration)] ease-[var(--motion-brand-enter)] hover:text-[var(--accent-green)]"
                >
                  <span className="text-display-3 font-display-semibold">
                    {link.title}
                  </span>
                  <ArrowUpRight className="h-[18px] w-[18px] transition-transform duration-[var(--motion-hover-in-duration)] ease-[var(--motion-brand-enter)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>

            <div className="mt-6 border border-white/10">
              <div className="border-b border-white/10 px-4 py-2.5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white/48">
                  Programs
                </p>
              </div>
              <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-1">
                {programLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeSheet}
                    className="text-heading-2 bg-surface-raised px-3 py-3 text-white transition-colors duration-[var(--motion-hover-in-duration)] ease-[var(--motion-brand-enter)] hover:text-[var(--accent-purple)] sm:px-4 sm:py-3.5"
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
            className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/48 transition-colors duration-[var(--motion-hover-in-duration)] ease-[var(--motion-brand-enter)] hover:text-white"
          >
            hello@techatnyu.org
          </Link>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/28">
            NYC / EST. 2009
          </span>
        </div>
      </motion.div>
    </motion.aside>
  )
}

export default NavbarMobile
