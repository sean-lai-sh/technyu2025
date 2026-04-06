import { Variants } from 'framer-motion'
import { motionTokens } from '@/lib/motion'

export const getBlurVariants = (reduceMotion: boolean): Variants => ({
  initial: {
    filter: 'blur(0px)',
    opacity: 1
  },
  open: {
    filter: reduceMotion ? 'blur(0px)' : 'blur(4px)',
    opacity: reduceMotion ? 0.88 : 0.6,
    transition: {
      duration: reduceMotion ? 0.1 : motionTokens.hoverOutDurationMs / 1000,
      ease: motionTokens.brandExitEase,
    }
  },
  closed: {
    filter: 'blur(0px)',
    opacity: 1,
    transition: {
      duration: reduceMotion ? 0.12 : motionTokens.hoverInDurationMs / 1000,
      ease: motionTokens.brandEnterEase,
    }
  }
})

export const getTranslateVariants = (reduceMotion: boolean): Variants => ({
    initial: {
        y: "100%",
        opacity: 0
    },

    enter: (i: number[]) => ({
        y: 0,
        opacity: 1,
        transition: {
          duration: reduceMotion ? 0.14 : motionTokens.enterDurationMs / 1000,
          ease: motionTokens.brandEnterEase,
          delay: reduceMotion ? 0 : i[0]
        }
    }),
    exit: (i: number[]) => ({
        y: "100%",
        opacity: 0,
        transition: {
          duration: reduceMotion ? 0.12 : motionTokens.exitDurationMs / 1000,
          ease: motionTokens.brandExitEase,
          delay: reduceMotion ? 0 : i[1]
        }
    })
})
