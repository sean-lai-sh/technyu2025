export type MotionEaseTuple = [number, number, number, number]

export interface MotionTokens {
  brandEnterEase: MotionEaseTuple
  brandExitEase: MotionEaseTuple
  brandEnterEaseCss: string
  brandExitEaseCss: string
  sheetEase: MotionEaseTuple
  sheetEaseCss: string
  enterDurationMs: number
  exitDurationMs: number
  progressDrainDelayMs: number
  progressDrainDurationMs: number
  hoverInDurationMs: number
  hoverOutDurationMs: number
  sheetDurationMs: number
}

const toCubicBezierCss = (ease: MotionEaseTuple): string => `cubic-bezier(${ease.join(', ')})`

const brandEnterEase: MotionEaseTuple = [0.22, 1, 0.36, 1]
const brandExitEase: MotionEaseTuple = [0.55, 0, 0.2, 1]
// Sheet exception — full-screen sheets (mobile nav drawer, modals).
// Symmetric in-out so the drawer settles and lifts off with equal weight.
// See Design.md § Motion → Curves and durations.
const sheetEase: MotionEaseTuple = [0.76, 0, 0.24, 1]

export const motionTokens: MotionTokens = {
  brandEnterEase,
  brandExitEase,
  brandEnterEaseCss: toCubicBezierCss(brandEnterEase),
  brandExitEaseCss: toCubicBezierCss(brandExitEase),
  sheetEase,
  sheetEaseCss: toCubicBezierCss(sheetEase),
  enterDurationMs: 560,
  exitDurationMs: 460,
  progressDrainDelayMs: 40,
  progressDrainDurationMs: 460,
  hoverInDurationMs: 220,
  hoverOutDurationMs: 180,
  sheetDurationMs: 780,
}

