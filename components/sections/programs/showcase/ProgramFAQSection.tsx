'use client'

import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'

export type FAQItem = { question: string; answer: string }

type ProgramFAQSectionProps = {
  eyebrow?: string
  title: string
  items: FAQItem[]
  accentColor?: string
}

export default function ProgramFAQSection({
  eyebrow = 'FAQ',
  title,
  items,
  accentColor = '#FF6836',
}: ProgramFAQSectionProps) {
  const titleLines = title.split('\n')

  return (
    <section className="px-[5vw] lg:px-[8vw] py-[10svh] border-t border-[#EDEDED]/8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.75fr] lg:gap-16">
        {/* Left: heading */}
        <div className="mb-10 lg:mb-0">
          <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold tracking-[0.15em] uppercase opacity-55 mb-4">
            {eyebrow}
          </p>
          <h2
            className="font-[family-name:var(--font-darker-grotesque)] font-medium leading-[0.92] text-[#EDEDED]"
            style={{ fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '-1px' }}
          >
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </div>

        {/* Right: accordion */}
        <AccordionPrimitive.Root type="single" collapsible>
          {items.map((item, index) => (
            <AccordionPrimitive.Item
              key={index}
              value={`item-${index}`}
              className="border border-[#EDEDED]/10 mb-3 hover:border-[#EDEDED]/25 hover:shadow-[0_0_0_1px_rgba(237,237,237,0.06)] data-[state=open]:border-[#EDEDED]/25 transition-all duration-200"
            >
              <AccordionPrimitive.Header>
                <AccordionPrimitive.Trigger
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer [&[data-state=open]>svg]:rotate-45 [&[data-state=open]>svg]:opacity-80"
                >
                  <span
                    className="flex-1 font-[family-name:var(--font-darker-grotesque)] text-[#EDEDED] font-medium leading-snug"
                    style={{ fontSize: 'clamp(15px, 1.3vw, 18px)' }}
                  >
                    {item.question}
                  </span>
                  <Plus
                    className="shrink-0 text-[#EDEDED]/40 transition-transform duration-200"
                    size={17}
                    style={{ color: accentColor, opacity: 0.7 }}
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <p
                  className="px-5 pb-5 font-[family-name:var(--font-satoshi)] text-[#EDEDED]/55 leading-relaxed"
                  style={{ fontSize: 'clamp(13px, 1vw, 15px)' }}
                >
                  {item.answer}
                </p>
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      </div>
    </section>
  )
}
