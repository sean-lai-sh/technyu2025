'use client'
import React from 'react'
import { FaqSection } from '@/lib/types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FaqSectionProps {
  section: FaqSection
}

export default function FaqSectionComponent({ section }: FaqSectionProps) {
  return (
    <section className="mt-18 px-[5vw] pb-20">
      <div className="mx-auto max-w-[1240px]">
        <h2
          className={`mb-8 font-[family-name:var(--font-satoshi)] text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl ${
            section.showUnderline ? 'underline underline-offset-8 decoration-white/40' : ''
          }`}
        >
          {section.heading}
        </h2>

        <div className="max-w-[860px] rounded-2xl border border-white/10 bg-surface-base p-3 md:p-5">
          <Accordion type="single" collapsible className="w-full">
            {section.items.map((faq, index) => (
              <AccordionItem
                key={faq._key || index}
                value={`item-${index}`}
                className="mb-2 rounded-lg border border-white/10 bg-black/40 px-4 last:mb-0"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-white hover:text-[#C8FDE3] md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-slate-300 md:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
