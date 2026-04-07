'use client'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import NavigationDropdown from './navigation_dropdown'
import { programs } from '@/lib/consts'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import styles from './style.module.css'
import NavbarMobile from './navbar-mobile'
import Logo from '@/components/assets/logo.svg'
import { useNavigation } from '@/contexts/navigation-context'

const brandEase = [0.65, 0, 0.35, 1] as [number, number, number, number]
const drawerEase = [0.76, 0, 0.24, 1] as [number, number, number, number]

const primaryLinks = [
  { name: 'Team', href: '/team' },
  { name: 'Press', href: '/press' },
]

const programLinks = programs.map((program) => ({
  name: program.name,
  href: program.href,
}))

const navUnderlineClassName =
  'pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] origin-left rounded-full bg-[#7c4dff] shadow-[0_0_14px_rgba(124,77,255,0.62)] transition-transform duration-300 group-hover:scale-x-100'

const Navbar = () => {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const {
    headerHeight,
    headerMode,
    isNavbarVisible,
    lastScrollY,
    setHeaderHeight,
  } = useNavigation()

  const isHomeOverlay = headerMode === 'home-overlay'
  const isPastHero = isHomeOverlay
    && viewportHeight > 0
    && lastScrollY >= Math.max(viewportHeight - headerHeight, 0)
  const hiddenOffset = -(headerHeight || 92)

  const mobilePrimaryLinks = useMemo(() => (
    [
      ...primaryLinks.map((link) => ({ title: link.name, href: link.href })),
      { title: 'Contact', href: 'mailto:hello@techatnyu.org' },
    ]
  ), [])

  const mobileProgramLinks = useMemo(() => (
    programLinks.map((link) => ({ title: link.name, href: link.href }))
  ), [])

  useLayoutEffect(() => {
    if (!headerRef.current) return

    const node = headerRef.current
    const updateHeaderHeight = () => {
      setHeaderHeight(node.getBoundingClientRect().height)
    }

    updateHeaderHeight()

    const resizeObserver = new ResizeObserver(updateHeaderHeight)
    resizeObserver.observe(node)
    window.addEventListener('resize', updateHeaderHeight)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateHeaderHeight)
    }
  }, [setHeaderHeight])

  useEffect(() => {
    setIsActive(false)
  }, [pathname])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsActive(false)
      }

      setViewportHeight(window.innerHeight)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    if (isActive) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
    }
  }, [isActive])

  const desktopLinkClassName = (isCurrent: boolean) => cn(
    'group relative flex items-center font-[family-name:var(--font-darker-grotesque)] text-[1.45rem] font-semibold uppercase tracking-[0.08em] text-white/76 transition-colors duration-300 hover:text-white',
    isCurrent && 'text-white'
  )

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[100]"
        initial={{ opacity: isHomeOverlay ? 0 : 1, y: 0 }}
        animate={{
          opacity: 1,
          y: isActive || isNavbarVisible ? 0 : hiddenOffset,
        }}
        transition={{
          opacity: {
            duration: isHomeOverlay ? 1.1 : 0.25,
            delay: isHomeOverlay ? 0.45 : 0,
            ease: brandEase,
          },
          y: {
            duration: 0.65,
            ease: drawerEase,
          },
        }}
      >
        <div
          ref={headerRef}
          className={cn(
            'relative w-full border-b border-white/12 transition-colors duration-500',
            !isHomeOverlay || isPastHero || isActive ? 'bg-black' : 'bg-transparent'
          )}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(109,94,252,0),rgba(109,94,252,0.92),rgba(126,247,165,0.65),rgba(126,247,165,0))]" />

          <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-4 sm:px-6 md:h-[92px] md:px-8 lg:px-[5vw]">
            <div className="flex min-w-0 items-center gap-4 md:gap-8">
              <Link href="/" className="flex items-center gap-4">
                <Logo
                  className="h-[28px] w-[116px] md:h-[40px] md:w-[170px]"
                  aria-label="tech@nyu logo"
                />
              </Link>

              <div className="hidden xl:flex flex-col justify-center">
                <span className="font-[family-name:var(--font-inter)] text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-white/35">
                  New York University
                </span>
                <span className="font-[family-name:var(--font-darker-grotesque)] text-[1rem] font-semibold uppercase tracking-[0.18em] text-white/72">
                  Student-led technical system
                </span>
              </div>
            </div>

            <div className="hidden h-full items-center gap-6 md:flex lg:gap-8">
              {primaryLinks.map((link) => {
                const isCurrent = pathname === link.href || pathname.startsWith(`${link.href}/`)

                return (
                  <Link key={link.href} href={link.href} className={desktopLinkClassName(isCurrent)}>
                    <span
                      className={cn(
                        'relative inline-flex items-center pb-[0.22em]',
                      )}
                    >
                      {link.name}
                      <span
                        className={cn(
                          navUnderlineClassName,
                          isCurrent ? 'scale-x-100' : 'scale-x-0'
                        )}
                      />
                    </span>
                  </Link>
                )
              })}

              <NavigationDropdown
                name="Programs"
                items={programLinks}
                active={pathname.startsWith('/programs')}
              />

              <Link
                href="mailto:hello@techatnyu.org"
                className={desktopLinkClassName(false)}
              >
                <span className="relative inline-flex items-center pb-[0.22em]">
                  Contact
                  <span className={cn(navUnderlineClassName, 'scale-x-0')} />
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-3 text-white md:hidden"
              onClick={() => setIsActive((previousState) => !previousState)}
              aria-expanded={isActive}
              aria-label={isActive ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <div className={`${styles.label} cursor-pointer`}>
                <motion.p variants={menuLabelOpacity} animate={!isActive ? 'open' : 'closed'}>
                  Menu
                </motion.p>
                <motion.p variants={menuLabelOpacity} animate={isActive ? 'open' : 'closed'}>
                  Close
                </motion.p>
              </div>
              <div className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isActive && (
          <NavbarMobile
            headerHeight={headerHeight}
            primaryLinks={mobilePrimaryLinks}
            programLinks={mobileProgramLinks}
            setIsActive={setIsActive}
          />
        )}
      </AnimatePresence>
    </>
  )
}

const menuLabelOpacity = {
  initial: {
    opacity: 0
  },

  open: {
    opacity: 1,
    transition: {
      duration: 0.5
    }
  },

  closed: {
    opacity: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default Navbar
