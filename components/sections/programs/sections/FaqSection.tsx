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
    <section className="mt-16 px-[5vw] pb-20">
      <h2
        className={`text-white text-2xl md:text-4xl lg:text-4xl font-bold text-left mb-8 ${
          section.showUnderline ? 'underline underline-offset-15' : ''
        }`}
      >
        {section.heading}
      </h2>

      <div className="max-w-4xl">
        <Accordion type="single" collapsible className="w-full">
          {section.items.map((faq, index) => (
            <AccordionItem
              key={faq._key || index}
              value={`item-${index}`}
              className="border-slate-700"
            >
              <AccordionTrigger className="text-white text-lg md:text-xl font-semibold hover:text-slate-300">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-300 text-base md:text-lg leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
