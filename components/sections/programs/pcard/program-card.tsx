'use client'
import React, { useState, useEffect } from 'react'
import './style.css'
import { ProgramCardProps } from '@/lib/types'
import Image from 'next/image'
import ProgramBar from './program-bar'
import { getApplicationLink } from '@/lib/application-links'

const ProgramCard = ({ProgramDetail, variant}: {ProgramDetail: ProgramCardProps, variant: string}) => {
  const { name, url, svgicon, tagline, description_large, description_small, desktopImage} = ProgramDetail;
  const { status } = getApplicationLink(name);

  // State for description based on screen size
  const [description, setDescription] = useState(description_small);

  useEffect(() => {
    const updateDescription = () => {
      setDescription(window.innerWidth >= 1200 ? description_large : description_small);
    };

    // Set initial description
    updateDescription();

    // Add resize listener
    window.addEventListener('resize', updateDescription);

    // Cleanup
    return () => window.removeEventListener('resize', updateDescription);
  }, [description_large, description_small]);
  return (
    <div className={`rectangle ${variant ? variant : ''} flex justify-between h-fit`}>
      <div className='w-full lg:w-[50%] flex justify-between flex-col sm:flex-row '>
        <div className='flex flex-col w-full sm:w-[80%] sm:p-10 lg:pr-0 p-8 py-0'>
          <div className={`h-24 w-24 sm:h-48 sm:w-48 xl:h-56 xl:w-56 flex items-center justify-center relative mt-20 sm:mt-16 shadow-none ${ProgramDetail.svgicon === "/program-logos/mentorship.svg" ? "-ml-5 sm:-ml-10" : "-ml-1 sm:-ml-5"}`}>
            <Image 
              src={`${svgicon}`}  
              alt={`${name} logo`}
              fill
              className='w-full h-full'
            />
          </div>
          <h1 className="text-white text-5xl xl:text-6xl font-bold text-left tracking-wide pb-3">
            {name}
          </h1>
          <h2 className='text-lg xl:text-xl text-white font-bold text-left sm:block hidden'>{tagline}</h2>
          <p className='text-white lg:text-lg xl:text-xl'>
            {description}
          </p>
        </div>
        <div className='flex sm:flex-col justify-between p-6 sm:p-10 lg:px-2 w-full sm:w-[30%] sm:items-end items-start'>
          {/* ProgramBar: color and text can be customized as needed */}
            <ProgramBar color={status ? "green" : "red"} text={status ? "Apps Open" : "Apps Closed"} />

            <a href={url} className='bg-gray-700/40 hover:bg-gray-400/30 text-white hover:scale-105 duration-300 transition-all ease-in-out w-24 h-16 flex justify-center items-center '>
            <p className=''>MORE</p>
          </a>
        </div>
      </div>
      <div className='w-[50%] hidden lg:flex items-end justify-end'>
        <Image
          src={`${desktopImage}`}
          alt={`${name} logo`}
          width={2000}
          height={2000}
          className='object-contain object-right w-full h-full'
        />
      </div>
    </div>
  )
}

export default ProgramCard
