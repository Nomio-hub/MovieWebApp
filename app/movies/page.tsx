'use client'
import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

 const page = () => {
  return (
    <div>
      <Header/>
      <div className='px-45'>
        <div className='space-y-8'>
          <div className='flex justify-between'>
            <div>
              <p className='font-bold text-4xl'>Wicked</p>
              <p>2024</p>
            </div>
            <div>
              <p>Rating</p>
               <div className='flex'>
                <img src="/star.svg" alt="" />
               <div>
                <p>6.9<span>/10</span>
                </p>
                <p>37k</p>
               </div>
               </div>
            </div>
          </div>
          <div className='h-107 flex gap-8'>
            <div className='w-72.5 rounded-sm overflow-hidden'><img className='w-full h-full object-cover' src="/wicked.jpg" alt="" /></div>
            <div className='w-190 rounded-sm overflow-hidden relative'><img className='w-full h-full object-cover absolute' src="/wicked.jpg" alt="" />
            <div className='flex gap-3 w-43.5 h-10 relative items-center justify-center'>
              <button className='rounded-full bg-white h-10 w-10'><img className=' px-4 py-2' src="/play.svg" alt="" /></button>
              <p className='text-base text-white'>Play trailer</p>
              <p className='text-sm text-white'>2:35</p>
            </div>
            </div>
            
          </div>
        </div>
        <div></div>
        <div></div>
      
      </div>
      <Footer/>
    </div>
  )
}

export default page