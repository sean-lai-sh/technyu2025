'use client'

import React, { startTransition, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { motionTokens } from '@/lib/motion'

export type SteppedTimelineItem = {
  id: string
  label: string
}

type StepChangeSource = 'auto' | 'manual'

type SteppedTimelineProps<T extends SteppedTimelineItem> = {
  items: T[]
  renderPanel: (item: T, index: number) => React.ReactNode
  defaultActiveIndex?: number
  autoAdvanceMs?: number
  advanceMode?: 'stop' | 'loop'
  ariaLabel?: string
  accentColor?: string
  onStepChange?: (index: number, item: T, source: StepChangeSource) => void
}

const PROGRESS_TICK_MS = 50
const DEFAULT_ACCENT = '#B300FF'

const clampIndex = (index: number, length: number) => {
  if (length <= 0) return 0
  return Math.min(Math.max(index, 0), length - 1)
}

export function SteppedTimeline<T extends SteppedTimelineItem>({
  items,
  renderPanel,
  defaultActiveIndex = 0,
  autoAdvanceMs = 5200,
  advanceMode = 'stop',
  ariaLabel = 'Timeline steps',
  accentColor = DEFAULT_ACCENT,
  onStepChange,
}: SteppedTimelineProps<T>) {
  const shouldReduceMotion = useReducedMotion()
  const { ref: inViewRef, inView: isInView } = useInView({ threshold: 0.35 })
  const [activeIndex, setActiveIndex] = useState(() => clampIndex(defaultActiveIndex, items.length))
  const [segmentProgress, setSegmentProgress] = useState(0)
  const [playbackVersion, setPlaybackVersion] = useState(0)
  const [transitionDirection, setTransitionDirection] = useState<1 | -1>(1)
  const elapsedRef = useRef(0)

  const itemCount = items.length
  const hasMultipleItems = itemCount > 1
  const lastIndex = itemCount - 1
  const safeActiveIndex = clampIndex(activeIndex, itemCount)
  const activeItem = items[safeActiveIndex]
  const isFinalStep = itemCount <= 0 || safeActiveIndex >= lastIndex
  const canAutoAdvance =
    hasMultipleItems && isInView && (advanceMode === 'loop' || !isFinalStep)

  const panelMotion = useMemo(
    () => ({
      initial: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : 10,
      },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0.12 : motionTokens.enterDurationMs / 1000,
          ease: motionTokens.brandEnterEase,
        },
      },
      exit: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : -8,
        transition: {
          duration: shouldReduceMotion ? 0.1 : motionTokens.exitDurationMs / 1000,
          ease: motionTokens.brandExitEase,
        },
      },
    }),
    [shouldReduceMotion],
  )

  const emitStepChange = (index: number, source: StepChangeSource) => {
    const item = items[index]
    if (!item) return
    onStepChange?.(index, item, source)
  }

  const advanceStep = () => {
    if (!hasMultipleItems) return

    const nextIndex = safeActiveIndex >= lastIndex ? 0 : safeActiveIndex + 1
    const nextDirection: 1 | -1 = nextIndex >= safeActiveIndex ? 1 : -1

    elapsedRef.current = 0
    setTransitionDirection(nextDirection)
    setSegmentProgress(0)
    startTransition(() => {
      setActiveIndex(nextIndex)
      setPlaybackVersion((current) => current + 1)
    })
    emitStepChange(nextIndex, 'auto')
  }

  useEffect(() => {
    const clampedIndex = clampIndex(defaultActiveIndex, items.length)
    elapsedRef.current = 0
    setTransitionDirection(1)
    setSegmentProgress(0)
    setActiveIndex(clampedIndex)
    setPlaybackVersion((current) => current + 1)
  }, [defaultActiveIndex, items])

  useEffect(() => {
    if (!activeItem) return
    if (!canAutoAdvance) {
      if (!hasMultipleItems) {
        setSegmentProgress(0)
        elapsedRef.current = 0
      }
      return
    }

    const startAt = performance.now() - elapsedRef.current
    const remainingMs = Math.max(autoAdvanceMs - elapsedRef.current, 0)

    if (remainingMs === 0) {
      advanceStep()
      return
    }

    if (shouldReduceMotion) {
      const timeoutId = window.setTimeout(() => {
        advanceStep()
      }, remainingMs)

      return () => {
        window.clearTimeout(timeoutId)
        elapsedRef.current = Math.min(performance.now() - startAt, autoAdvanceMs)
      }
    }

    const intervalId = window.setInterval(() => {
      const elapsed = Math.min(performance.now() - startAt, autoAdvanceMs)
      elapsedRef.current = elapsed
      setSegmentProgress((elapsed / autoAdvanceMs) * 100)
    }, PROGRESS_TICK_MS)

    const timeoutId = window.setTimeout(() => {
      setSegmentProgress(100)
      advanceStep()
    }, remainingMs)

    return () => {
      window.clearInterval(intervalId)
      window.clearTimeout(timeoutId)
      elapsedRef.current = Math.min(performance.now() - startAt, autoAdvanceMs)
    }
  }, [
    activeItem,
    advanceStep,
    autoAdvanceMs,
    canAutoAdvance,
    hasMultipleItems,
    shouldReduceMotion,
    playbackVersion,
  ])

  const handleStepSelect = (index: number) => {
    if (!items[index]) return

    const nextDirection: 1 | -1 = index >= safeActiveIndex ? 1 : -1
    elapsedRef.current = 0
    setTransitionDirection(nextDirection)
    setSegmentProgress(0)
    startTransition(() => {
      setActiveIndex(index)
      setPlaybackVersion((current) => current + 1)
    })

    if (index !== safeActiveIndex) {
      emitStepChange(index, 'manual')
    }
  }

  const getConnectorProgress = (index: number) => {
    if (index < safeActiveIndex) return 100
    if (index === safeActiveIndex) return shouldReduceMotion ? 0 : segmentProgress
    return 0
  }

  return (
    <div ref={inViewRef}>
      <div className="overflow-x-auto pb-4 -mx-[5vw] px-[5vw]">
        <div className="flex items-center gap-0 min-w-max relative mb-14" role="list" aria-label={ariaLabel}>
          {items.map((item, index) => {
            const isCompleted = index < safeActiveIndex
            const isActive = index === safeActiveIndex
            const progress = index < itemCount - 1 ? getConnectorProgress(index) : 0
            const pillStyle = isActive || isCompleted
              ? {
                  borderColor: accentColor,
                  color: accentColor,
                  boxShadow: isActive ? `0 0 18px color-mix(in srgb, ${accentColor} 28%, transparent)` : undefined,
                }
              : undefined

            return (
              <React.Fragment key={item.id}>
                <button
                  type="button"
                  onClick={() => handleStepSelect(index)}
                  aria-current={isActive ? 'step' : undefined}
                  className={`font-[family-name:var(--font-inter)] text-[13px] font-medium px-5 py-2.5 border rounded-full whitespace-nowrap transition-all duration-300 ${
                    isActive || isCompleted
                      ? ''
                      : 'border-[#EDEDED]/35 text-[#EDEDED]/55 hover:border-[#EDEDED]/60 hover:text-[#EDEDED]/80'
                  }`}
                  style={pillStyle}
                >
                  {item.label}
                </button>
                {index < itemCount - 1 && (
                  <div className="relative w-8 h-px bg-[#EDEDED]/28 flex-shrink-0 overflow-hidden">
                    <span
                      className="absolute inset-y-0 left-0 block"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: accentColor,
                        transition:
                          shouldReduceMotion || index !== safeActiveIndex
                            ? 'none'
                            : `width ${PROGRESS_TICK_MS + 20}ms linear`,
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      <div className="max-w-[700px]">
        <AnimatePresence mode="wait" initial={false} custom={transitionDirection}>
          {activeItem ? (
            <motion.div
              key={activeItem.id}
              custom={transitionDirection}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={panelMotion}
            >
              {renderPanel(activeItem, safeActiveIndex)}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SteppedTimeline
