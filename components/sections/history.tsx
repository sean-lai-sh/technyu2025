import AlumniResultsBento from '../ui/alumni-results-bento'
import { getAlumniResultsSection } from '@/lib/sanity/queries'

const History = async () => {
  const section = await getAlumniResultsSection()

  return (
    <section id="history" className="flex min-h-[20svh] w-full flex-col justify-center px-5 pt-12 md:px-10 lg:px-[5vw]">
      <div className="mx-auto w-full max-w-[1600px]">
        <h2 className="text-center font-[family-name:var(--font-inter)] text-[0.82rem] font-medium uppercase tracking-[0.3em] text-white/72 sm:text-[0.92rem]">
          {section.heading}
        </h2>
        {section.body ? (
          <p className="mx-auto mt-3 max-w-[46rem] text-center font-[family-name:var(--font-inter)] text-[15px] leading-[1.55] text-white/48 md:text-[17px]">
            {section.body}
          </p>
        ) : null}
        <AlumniResultsBento tiles={section.tiles} className="mt-6 md:mt-8" />
        {section.footnote ? (
          <p className="mt-4 text-center font-[family-name:var(--font-inter)] text-xs tracking-[0.12em] text-white/48 sm:text-sm">
            {section.footnote}
          </p>
        ) : null}
      </div>
    </section>
  )
}

export default History
