import type { Metadata } from 'next'
import Card404 from '@/components/404/404card'
import { SITE_DESCRIPTION } from '@/lib/seo'
import { ValueCardProps } from '@/lib/types'
import React from 'react'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: SITE_DESCRIPTION,
}

const NotFound = () => {
  const valuesData: ValueCardProps[] = [
      {
          name: "Error",
          svgicon: "/value-logos/community.svg",
          description: "Meet other tech-enthusiasts, builders, and curious minds."
      },
      {
          name: "Learning", 
          svgicon: "/value-logos/learning.svg",
          description: "Pick up new skills or brush up your code."
      },
      {
          name: "Creativity", 
          svgicon: "/value-logos/creativity.svg",
          description: "Ideate and innovate your ideas through design and creative computing."
      }
  ]
  return (
    <div className='w-screen h-screen'>
       <div className="relative z-20 w-full">
        <div className="top-[10vh] w-full mt-[10vh] absolute">
          <div className="w-[80vw] flex items-center justify-center text-3xl font-bold ml-[5vw]">
            <Card404 ValueDetail={valuesData[0]} variant="purple"/>
          </div>
        </div>
        <div className="top-[11vh] w-full h-screen flex items-center justify-center absolute">
          <div className="w-[80vw] rounded-2xl shadow-xl flex items-center justify-center text-3xl font-bold ml-[10vw]">
            <Card404 ValueDetail={valuesData[1]} variant="green"/>
          </div>
        </div>
        <div className="top-[50vh] w-full flex items-start justify-start pb-[10vh] absolute">
          <div className="w-[80vw] rounded-2xl shadow-xl flex items-center justify-center text-3xl font-bold ml-[10vw]">
            <Card404 ValueDetail={valuesData[2]} variant="purple"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
