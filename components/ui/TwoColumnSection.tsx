import React from 'react'
import Image from 'next/image'

interface TwoColumnSectionProps {
  title: string
  description: React.ReactNode
  image?: string
  flip?: boolean
  last?: boolean
}

const TwoColumnSection = ({ title, description, image, flip, last }: TwoColumnSectionProps) => {
  return (
    <div className='relative lg:grid lg:grid-cols-2 outline-1 outline-gray-500/20'>
      {/* Top border */}
      <span className='absolute top-0 left-0 w-full h-[1px] z-10 bg-white' />
      {/* Left border */}
      <span className='absolute top-0 left-0 w-[1px] h-full z-10 bg-white' />
      {/* Bottom border */}
      {last && <span className='absolute bottom-0 left-0 w-full h-[1px] z-10 bg-white' />}
      <div className={`py-5 lg:p-[4rem] xl:p-[6rem] ${flip ? 'lg:order-2 lg:border-l border-white/20' : 'lg:border-r border-white/20'}`}>
        <h2 className='md:text-4xl text-5xl font-bold'>{title}</h2>
        <br/>
        <br/>
        <div className='text-lg'>{description}</div>
      </div>
      <div className='w-full h-full items-center flex justify-center'>
      <div className={`w-full h-full lg:py-0 xl:mx-[6rem] bg-amber-200 relative overflow-hidden ${flip ? 'lg:order-1' : ''}`}>
        {image && (
          <img src={image} className="w-full h-auto object-contain" />
        )}
      </div>
      </div>
    </div>
  )
}

export default TwoColumnSection
