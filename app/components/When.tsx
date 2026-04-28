import React from 'react'
type WhenProps = {
  when: string;
}

export const When = ({ when }: WhenProps) => {
  return (
      <div className='flex w-full justify-between pb-8 pt-13'>
        <p className="font-semibold text-2xl">{when}</p>
        <div className='flex justify-center items-center gap-2'>
            <p className=' text-sm text-medium'>See more</p>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.5 5.16667H9.83333M9.83333 5.16667L5.16667 0.5M9.83333 5.16667L5.16667 9.83333" stroke="#18181B" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    </div>
    
    
  )
}
