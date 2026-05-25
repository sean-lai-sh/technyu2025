import React from 'react'
import LogoGrid from '../ui/logo-grid'

const outcomeCompanies = [
  {
    src: '/company-logos/apple.svg',
    alt: 'Apple',
    width: 562,
    height: 192,
  },
  {
    src: '/company-logos/google.svg',
    alt: 'Google',
    width: 183,
    height: 60,
  },
  {
    src: '/company-logos/meta.svg',
    alt: 'Meta',
    width: 948,
    height: 191,
  },
  {
    src: '/company-logos/amazon.svg',
    alt: 'Amazon',
    width: 603,
    height: 182,
    offsetY: 10,
  },
  {
    src: '/company-logos/microsoft.svg',
    alt: 'Microsoft',
    width: 338,
    height: 72,
  },
  {
    src: '/company-logos/stripe.svg',
    alt: 'Stripe',
    width: 144,
    height: 60,
  },
  {
    src: '/company-logos/Anthropic.svg',
    alt: 'Anthropic',
    width: 579,
    height: 65,
  },
  {
    src: '/company-logos/Coinbase_Wordmark.svg',
    alt: 'Coinbase',
    width: 1102,
    height: 197,
  },
  {
    src: '/company-logos/Cursor.svg',
    alt: 'Cursor',
    width: 2239,
    height: 533,
  },
  {
    src: '/company-logos/datadog.svg',
    alt: 'Datadog',
    width: 801,
    height: 196,
  },
  {
    src: '/company-logos/jane-street.svg',
    alt: 'Jane Street',
    width: 181,
    height: 49,
  },
  {
    src: '/company-logos/pinterest.svg',
    alt: 'Pinterest',
    width: 196,
    height: 36,
  },
  {
    src: '/company-logos/blackrock.svg',
    alt: 'BlackRock',
    width: 152,
    height: 22,
  },
  {
    src: '/company-logos/jpmc.svg',
    alt: 'JPMC',
    width: 140,
    height: 30,
  },
  {
    src: '/company-logos/clay.svg',
    alt: 'Clay',
    width: 200,
    height: 63,
  },
  {
    src: '/company-logos/box.svg',
    alt: 'Box',
    width: 40,
    height: 22,
    offsetY: -4,
  },
  {
    src: '/company-logos/carta.svg',
    alt: 'Carta',
    width: 99,
    height: 43,
    maxVisualWidth: 132,
  },
  {
    src: '/company-logos/check.svg',
    alt: 'Check',
    width: 142,
    height: 34,
    marker: '*',
    markerOffsetX: 48,
    markerOffsetY: -12,
  },
  {
    src: '/company-logos/apollo-global.svg',
    alt: 'Apollo Global',
    width: 343,
    height: 54,
  },
  {
    src: '/company-logos/the-browser-company.svg',
    alt: 'The Browser Company',
    width: 1023,
    height: 515,
    marker: '*',
    markerOffsetX: 28,
    markerOffsetY: -16,
  },
  {
    src: '/company-logos/tandem-health.svg',
    alt: 'Tandem Health',
    width: 95,
    height: 20,
    maxVisualWidth: 168,
  },
  {
    src: '/company-logos/nozomio.svg',
    alt: 'Nozomio',
    width: 406,
    height: 89,
  },
  {
    src: '/company-logos/Manus_AI.svg',
    alt: 'Manus AI',
    width: 207,
    height: 60,
  },
  {
    src: '/company-logos/zingage.svg',
    alt: 'Zingage',
    width: 188,
    height: 24,
    offsetY: -3,
  },
]

const History = () => {
  return (
    <section id="history" className="flex min-h-[60svh] w-full flex-col justify-center px-5 py-12 md:px-10 lg:px-[5vw]">
      <div className="mx-auto w-full max-w-[1600px]">
        <h2 className="text-center font-[family-name:var(--font-inter)] text-[0.82rem] font-medium uppercase tracking-[0.3em] text-white/72 sm:text-[0.92rem]">
          Developing Talent
        </h2>
        <LogoGrid
          density="compact"
          logos={outcomeCompanies}
          className="mt-6 max-w-[1280px] md:mt-8"
          footnote="* Founded by Tech@NYU E-Board alumni"
        />
      </div>
    </section>
  )
}

export default History
