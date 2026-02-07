'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// When the time comes to build the program pages
import NavigationDropdown from './navigation_dropdown'
import { programs } from '@/lib/consts'
import { AnimatePresence, motion } from 'framer-motion';
import styles from './style.module.css';
import NavbarMobile from './navbar-mobile'
import Logo from '@/components/assets/logo.svg'
import { useNavigationSafe } from '@/contexts/navigation-context'

const Navbar = () => {
  const pathname = usePathname()
  const isRootRoute = pathname === '/'
  const [isActive, setIsActive] = useState(false);

  // Try to use shared navigation context (available on pages with NavigationProvider)
  const navContext = useNavigationSafe()

  // Local fallback state for when context is not available
  const [localIsVisible, setLocalIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Use context value if available, otherwise use local state
  const isVisible = navContext?.isNavbarVisible ?? localIsVisible

  // Only run local scroll detection when context is not available
  useEffect(() => {
    if (navContext) return // Context handles scroll detection

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const currentScrollY = window.scrollY;
        const scrollDifference = Math.abs(currentScrollY - lastScrollY);

        // Only trigger if scroll difference is significant (more than 5px)
        if (scrollDifference < 5) return;

        // Show navbar when scrolling up, hide when scrolling down
        if (currentScrollY < lastScrollY) {
          setLocalIsVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
          // Only hide after scrolling down past 100px
          setLocalIsVisible(false);
        }

        setLastScrollY(currentScrollY);
      }, 50); // 50ms debounce
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [navContext, lastScrollY]);

  return (
    <motion.div 
      className='fixed w-full z-[100]'
      initial={{ opacity: isRootRoute ? 0 : 1 }}
      animate={{ 
        opacity: 1,
        translateY: isVisible ? 0 : -200
      }}
      transition={{ 
        opacity: { duration: 1.5, delay: 0.75, ease:[0.65, 0, 0.35, 1] },
        translateY: { duration: 0.7, ease: 'easeInOut' }
      }}
      
    >
        <div className='flex w-full justify-center relative font-bold'>
            <div className='outline outline-white rounded-xl lg:rounded-3xl w-[90svw] md:w-[85svw] lg:w-[95svw] h-16 md:min-h-24 p-5 px-3 md:px-10 text-lg bg-black mt-2 md:mt-10 z-[100]'>
                <div className='w-full h-full flex justify-between items-center'>
                    <Link href="/">
                        <Logo className='object-contain w-[120px] h-[30px] md:w-[200px] md:h-[50px] mt-1' aria-label="tech@nyu logo" />
                    </Link>
                    <div className='gap-5 md:gap-10 text-xl lg:text-2xl hidden md:flex text-center'>
                        <Link href="/team" className='text-white hover:underline '>Team</Link>
                        {/* <Link href="/about" className='text-white hover:underline'>About</Link> */}
                        <NavigationDropdown name="Programs" items={programs.map(prog => ({ name: prog.name, href: prog.href }))} />
                        {/* For future patch */}
                        <Link href="mailto:hello@techatnyu.org" className='text-white hover:underline'>Contact</Link>
                    </div>
                    <div className='md:hidden flex items-center justify-center gap-2 text-white text-sm' onClick={() => setIsActive(!isActive)}>
                        <div className={`${styles.label} cursor-pointer`}>
                            <motion.p variants={opacity} animate={!isActive ? "open" : "closed"}>Menu</motion.p>
                            <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>Close</motion.p>
                        </div>
                        <div className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`}/>
                    </div>
                </div>
            </div>
        </div>
        <AnimatePresence mode='wait'>
            {isActive && (
                <>
                    <motion.div
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed md:hidden inset-0 z-[0] backdrop-blur-lg bg-black/30"
                    />
                    <NavbarMobile setIsActive={setIsActive}/>
                </>
            )}
        </AnimatePresence>
    </motion.div>
  )
}

const opacity = {
    initial: {
        opacity: 0
    },

    open: {
        opacity: 1,
        transition: {duration: 0.5}
    },

    closed: {
        opacity: 0,
        transition: {duration: 0.5}
    }
}

export default Navbar
