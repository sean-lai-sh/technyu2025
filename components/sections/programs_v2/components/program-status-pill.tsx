import React from 'react'

type ProgramStatusPillProps = {
  isOpen: boolean
}

export default function ProgramStatusPill({ isOpen }: ProgramStatusPillProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] ${
        isOpen
          ? 'border-[#4DFF94]/30 bg-[#4DFF94]/10 text-[#BFFFD5]'
          : 'border-white/10 bg-white/5 text-white/48'
      }`}
    >
      <span
        className={`h-2.5 w-2.5 ${
          isOpen ? 'bg-[#4DFF94]' : 'bg-white/25'
        }`}
      />
      {isOpen ? 'Applications open' : 'Applications closed'}
    </span>
  )
}
