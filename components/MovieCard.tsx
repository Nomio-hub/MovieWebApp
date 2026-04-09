import React from 'react'

export const MovieCard = () => {
  return (
    <div className="w-[229.73px] h-109.75 bg-[#F4F4F5] rounded-lg overflow-hidden gap-1">
      <div className="w-full h-85 bg-[url('/dragon.jpg')] bg-cover bg-center"></div>
      <div className='flex gap-1 items-center'>
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.16667 0.5L9.22667 4.67333L13.8333 5.34667L10.5 8.59333L11.2867 13.18L7.16667 11.0133L3.04667 13.18L3.83333 8.59333L0.5 5.34667L5.10667 4.67333L7.16667 0.5Z" fill="#FDE047" stroke="#FDE047" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p className=' text-[#09090B] text-sm font-medium'>6.9/10</p>

      </div>
      <p className='text-[#09090B] font-normal text-lg '>How To Train Your Dragon Live Action</p>
    </div>
  )
}
