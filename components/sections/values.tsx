import React from 'react'
import ValueCard from './values/value_card'
import { valuesData } from '@/lib/consts'

const Values = () => {
  return (
    <section id='values' className="relative">
      {/* Grid background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {/* Vertical grid lines */}
        {[...Array(18)].map((_, i) => (
          <line
            key={`vgrid-${i}`}
            x1={`${(i * 100) / 18}%`} y1="0" x2={`${(i * 100) / 18}%`} y2="100%"
            stroke="white"
            strokeWidth="2"
            opacity={i % 2 === 0 ? 0.6 : 0.3}
            style={{  }}
          />
        ))}
        {/* Horizontal grid lines */}
        {[...Array(25)].map((_, i) => (
          <line
            key={`hgrid-${i}`}
            x1="0" y1={`${(i * 100) / 24}%`} x2="100%" y2={`${(i * 100) / 24}%`}
            stroke="white"
            strokeWidth="2"
            opacity={i % 2 === 0 ? 0.6 : 0.3}
            style={{  }}
          />
        ))}
      </svg>
      {/* Content goes here */}
      <div className="relative z-20 w-full h-[300svh] mb-[10vh]">
        <h2 className='px-[5vw] py-[1vw] text-2xl lg:text-4xl font-extrabold bg-black '>
          Our Values
        </h2>
        {/* Parallax sticky cards */}
        <div className="sticky top-[10svh] w-full h-[90svh] mt-[10vh]">
          <div className="w-[80vw] h-[50svh] flex items-center justify-center text-3xl font-bold ml-[5vw]">
            <ValueCard ValueDetail={valuesData[0]} variant="purple"/>
          </div>
        </div>
        <div className="sticky top-[0svh] w-full h-screen flex items-center justify-center">
          <div className="w-[80vw] h-[50svh] rounded-2xl shadow-xl flex items-center justify-center text-3xl font-bold ml-[10vw]">
            <ValueCard ValueDetail={valuesData[1]} variant="green"/>
          </div>
        </div>
        <div className="sticky top-[40svh] w-full flex items-start justify-start pb-[10vh]">
          <div className="w-[80vw] h-[50svh] rounded-2xl shadow-xl flex items-center justify-center text-3xl font-bold ml-[10vw]">
            <ValueCard ValueDetail={valuesData[2]} variant="purple"/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Values
