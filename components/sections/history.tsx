import React from 'react'
import { startupWeekCompanies } from '@/lib/consts'
import LogoGrid from '../ui/logo-grid'

const horizontalOutcomeCompanies = startupWeekCompanies.filter((company) =>
  [
    'Sequoia Capital',
    'Stripe',
    'Neo',
    'Anthropic',
    'Google',
    'ZFellows',
  ].includes(company.alt),
)

const History = () => {
  return (
    <section id="history" className="w-[100svw] px-5 py-16 md:px-10 md:py-20 lg:px-[5vw]">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="text-center font-[family-name:var(--font-satoshi)] text-[0.82rem] font-medium uppercase tracking-[0.3em] text-white/72 sm:text-[0.92rem]">
          Where We&apos;ve Gone
        </h2>
        <LogoGrid logos={horizontalOutcomeCompanies} className="mt-8 max-w-[1440px] md:mt-10" />
      </div>
    </section>
  )
}

export default History
