export type MotionEaseTuple = [number, number, number, number]

export interface MotionTokens {
  brandEnterEase: MotionEaseTuple
  brandExitEase: MotionEaseTuple
  brandEnterEaseCss: string
  brandExitEaseCss: string
  enterDurationMs: number
  exitDurationMs: number
  progressDrainDelayMs: number
  progressDrainDurationMs: number
  hoverInDurationMs: number
  hoverOutDurationMs: number
}

const toCubicBezierCss = (ease: MotionEaseTuple): string => `cubic-bezier(${ease.join(', ')})`

const brandEnterEase: MotionEaseTuple = [0.22, 1, 0.36, 1]
const brandExitEase: MotionEaseTuple = [0.55, 0, 0.2, 1]

export const motionTokens: MotionTokens = {
  brandEnterEase,
  brandExitEase,
  brandEnterEaseCss: toCubicBezierCss(brandEnterEase),
  brandExitEaseCss: toCubicBezierCss(brandExitEase),
  enterDurationMs: 560,
  exitDurationMs: 460,
  progressDrainDelayMs: 40,
  progressDrainDurationMs: 460,
  hoverInDurationMs: 220,
  hoverOutDurationMs: 180,
}

