import React from 'react'
import Image from 'next/image'

interface TwoColumnSectionProps {
  title: string
  description: React.ReactNode
  image?: string
  flip?: boolean
}

const TwoColumnSection = ({ title, description, image, flip }: TwoColumnSectionProps) => {
  return (
    <div className='lg:grid lg:grid-cols-2 outline-1 outline-white/60'>
      {/* <span className='border-t border-4 border-red-500/60' /> */}
      {/* <span className='border-l-4 border-4 border-red-500/60' /> */}
      <div className={`py-5 lg:p-[4rem] xl:p-[6rem] ${flip ? 'lg:order-2' : ''}`}>
        <h2 className='md:text-4xl text-5xl font-bold'>{title}</h2>
        <br/>
        <br/>
        <div className='text-lg'>{description}</div>
      </div>
      <div className='w-full h-full bg-red-50 items-center flex justify-center'>
      <div className={`w-full aspect-square lg:py-0 lg:px-[6rem] bg-amber-200 relative overflow-hidden ${flip ? 'lg:order-1' : ''}`}>
        {image && (
          <img src={image} className="w-full h-auto object-contain" />
        )}
      </div>
      </div>
    </div>
  )
}

export default TwoColumnSection
