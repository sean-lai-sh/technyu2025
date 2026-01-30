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
    <div className='lg:grid lg:grid-cols-2'>
      <div className={`py-5 lg:p-[8rem] ${flip ? 'lg:order-2' : ''}`}>
        <h2 className='text-5xl font-bold'>{title}</h2>
        <br/>
        <br/>
        <div>{description}</div>
      </div>
      <div className={`w-full h-full lg:px-[8rem] bg-amber-200 relative overflow-hidden ${flip ? 'lg:order-1' : ''}`}>
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className='object-cover aspect-square'
            unoptimized
          />
        )}
      </div>
    </div>
  )
}

export default TwoColumnSection
