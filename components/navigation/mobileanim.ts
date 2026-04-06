import { Variants } from 'framer-motion'
import { motionTokens } from '@/lib/motion'

export const getHeightVariants = (reduceMotion: boolean): Variants => {
  const duration = reduceMotion ? 0.14 : motionTokens.enterDurationMs / 1000

  return {
    initial: {
      height: 0
    },
    enter: {
      height: 'auto',
      transition: { duration, ease: motionTokens.brandEnterEase }
    },
    exit: {
      height: 0,
      transition: {
        duration: reduceMotion ? 0.12 : motionTokens.exitDurationMs / 1000,
        ease: motionTokens.brandExitEase,
      }
    }
  }
}
