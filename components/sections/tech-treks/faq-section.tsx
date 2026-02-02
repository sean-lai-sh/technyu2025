import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const FAQSection = () => {
  return (
    <section id='faq'>
      <h2 className='text-white text-3xl md:text-4xl lg:text-5xl font-bold text-left mb-12 mt-16'>
        FAQ
      </h2>
      <Accordion type="single" collapsible className='w-full'>
        <AccordionItem value="item-1" className='bg-black border border-white/10 rounded-xl mb-4'>
          <AccordionTrigger className='w-full px-6 py-4 text-left text-white text-lg font-medium hover:bg-white/5 rounded-t-xl flex justify-between items-center'>
            What if I have no prior experience in tech?
          </AccordionTrigger>
          <AccordionContent className='px-6 pb-4 text-white/80'>
            No worries! Tech Treks is designed for beginners. Our members come from diverse backgrounds, and we provide workshops and mentorship to help you get started.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className='bg-black border border-white/10 rounded-xl mb-4'>
          <AccordionTrigger className='w-full px-6 py-4 text-left text-white text-lg font-medium hover:bg-white/5 rounded-t-xl flex justify-between items-center'>
            How much time commitment is required?
          </AccordionTrigger>
          <AccordionContent className='px-6 pb-4 text-white/80'>
            Members are expected to attend two one-hour meetings each week. After teams are formed each semester, we find common times that work for everyone. We also suggest an additional weekly small-group meeting for more project work.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className='bg-black border border-white/10 rounded-xl mb-4'>
          <AccordionTrigger className='w-full px-6 py-4 text-left text-white text-lg font-medium hover:bg-white/5 rounded-t-xl flex justify-between items-center'>
            What kind of projects will I work on?
          </AccordionTrigger>
          <AccordionContent className='px-6 pb-4 text-white/80'>
            Projects vary each semester based on member interests. Past projects include web apps, mobile apps, and data analysis tools. The focus is on learning and building a portfolio. We always say what you put in is what you get out — we’ve even had startups and full-on research projects spin up from this program.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className='bg-black border border-white/10 rounded-xl mb-4'>
          <AccordionTrigger className='w-full px-6 py-4 text-left text-white text-lg font-medium hover:bg-white/5 rounded-t-xl flex justify-between items-center'>
            How are project teams selected?
          </AccordionTrigger>
          <AccordionContent className='px-6 pb-4 text-white/80'>
            During our first week of meetings, everyone will get to know each other by discussing experience levels, project ideas, and interests. After that, you’ll select who you’d like to work with. We’ll do our best to accommodate everyone and form balanced groups based on frontend and backend interests.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className='bg-black border border-white/10 rounded-xl mb-4'>
          <AccordionTrigger className='w-full px-6 py-4 text-left text-white text-lg font-medium hover:bg-white/5 rounded-t-xl flex justify-between items-center'>
            What will weekly meetings look like?
          </AccordionTrigger>
          <AccordionContent className='px-6 pb-4 text-white/80'>
            One weekly meeting includes a workshop followed by work time, while the other is dedicated purely to project development. Leads and PMs will be present to answer questions and offer advice. We’ll also share updates about opportunities within Tech@NYU each week.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6" className='bg-black border border-white/10 rounded-xl mb-4'>
          <AccordionTrigger className='w-full px-6 py-4 text-left text-white text-lg font-medium hover:bg-white/5 rounded-t-xl flex justify-between items-center'>
            How are cohort members selected?
          </AccordionTrigger>
          <AccordionContent className='px-6 pb-4 text-white/80'>
            Cohort members are selected primarily based on their interest and commitment. You don’t need prior experience, though some coding knowledge can help you get started faster.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7" className='bg-black border border-white/10 rounded-xl mb-4'>
          <AccordionTrigger className='w-full px-6 py-4 text-left text-white text-lg font-medium hover:bg-white/5 rounded-t-xl flex justify-between items-center'>
            How are PMs selected?
          </AccordionTrigger>
          <AccordionContent className='px-6 pb-4 text-white/80'>
            PMs are selected based on their experience and willingness to mentor others. If you have relevant skills and a passion for helping peers, we encourage you to apply!
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8" className='bg-black border border-white/10 rounded-xl mb-4'>
          <AccordionTrigger className='w-full px-6 py-4 text-left text-white text-lg font-medium hover:bg-white/5 rounded-t-xl flex justify-between items-center'>
            What skills will I learn as a member?
          </AccordionTrigger>
          <AccordionContent className='px-6 pb-4 text-white/80'>
            This varies from semester to semester, but we’ll help you get comfortable with React and other modern tools used in full-stack development. Our curriculum adapts to the current job market and gives you the flexibility to explore which areas of tech you want to focus on.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}

export default FAQSection
