import React from 'react'
import './style.css'
import { ValueCardProps } from '@/lib/types'
import Image from 'next/image'

const Card404 = ({ValueDetail, variant}: {ValueDetail: ValueCardProps, variant: string}) => {
  const { name, svgicon, description } = ValueDetail;
  return (
    <div className={`rectangle ${variant ? variant : ''}`}>
        {/* <div className={` w-full h-full`}> */}
            <div className={`text-white h-[10vh] bg-transparent outline-2 outline-[#FF4B2B] w-full flex items-center justify-start p-5`}>
                <h1 style={{ 
                  filter: 'drop-shadow(10px 0 5px rgba(255, 75, 43, 0.95)) drop-shadow(0 0 10px rgba(255, 75, 43, 0.95)) drop-shadow(0 -10px 16px rgba(255, 75, 43, 0.70)) drop-shadow(0 5px 21px rgba(255, 75, 43, 0.6)) drop-shadow(0 0 26px rgba(255, 75, 43, 0.75))'
                }}
                className='text-[3vw] font-normal tracking-tight leading-7'
                >
                    {name}
                </h1>
            </div>
      <div className='flex items-center justify-center w-full md:h-[40vh]'>
        <div className='flex flex-row items-center justify-between md:gap-6 w-full h-full p-10 sm:p-10'>
          <p className='text-white text-lg lg:text-[2svw] text-left min-w-[100px]'>{description}</p>
          <Image 
            src={svgicon}  
            alt={`${name} icon`}
            width={320}
            height={320}
            className='w-32 h-32 md:w-42 md:h-42 flex-shrink-0'
          />
        </div>
      </div>
    </div>
  )
}

export default Card404

