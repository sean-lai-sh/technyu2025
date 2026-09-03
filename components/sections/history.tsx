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
        <AlumniResultsBento tiles={section.tiles} className="mt-6 md:mt-8" />
      </div>
    </section>
  )
}

export default History
