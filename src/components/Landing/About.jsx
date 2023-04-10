import React from 'react'
import {BsArrowRightShort,BsArrowLeftSquare} from 'react-icons/bs'
import CardContainer from './CardContainer'
import { data } from './CardData'


const About = () => {
  return (
    // parent container housing text and card
    <div className=''>
      {/* text container and button container*/}
      <div className='flex flex-row justify-between mt-12'>
        {/* text container */}
        <div className='text-left w-1/2 '>
          <h1 className='text-[#0A0A0A] text-3xl font-semibold'>Latest News & Articles</h1>
          <p className='mt-3 text-[#7D7D7D] '>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            consectetur adipiscing elit consectetur adipiscing elit.
          </p>
        </div>
        {/* button container */}
        <div className='space-x-2 pt-2'>
          <button className=' text-[#83BF4F]'><BsArrowLeftSquare size={45}/></button>
          <button className='bg-[#83BF4F] outline-[#83BF4F] rounded-md text-white'><BsArrowRightShort size={45}/></button>
        </div>
      </div>
      {/* carousel container */}
      <div className='mt-7 grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-x-80 w-full items-center'>
        <CardContainer item={data}/>
        
        
      </div>
      
      

    </div>
  )
}

export default About