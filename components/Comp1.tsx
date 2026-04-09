import React from 'react'

export const Comp1 = () => {
  return (
    <div className="w-full h-150 bg-[url('/wicked.jpg')] bg-cover bg-center relative ">
      <div className="absolute ">
        <div className="w-110 h-66 text-white space-y-4 pt-44.5 pl-35">
      <div>
        <p className="text-base">Now playing:</p>
        <p className="text-4xl font-bold">Wicked</p>
      </div>
      <div className="flex ">
        <svg
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.1667 0.5L15.7717 7.80333L23.8333 8.98167L18 14.6633L19.3767 22.69L12.1667 18.8983L4.95667 22.69L6.33333 14.6633L0.5 8.98167L8.56167 7.80333L12.1667 0.5Z"
            fill="#FDE047"
            stroke="#FDE047"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p>6.9/10</p>
      </div>

      <p className="text-xs">
        Elphaba, a misunderstood young woman because of her green skin, and
        Glinda, a popular girl, become friends at Shiz University in the Land of
        Oz. After an encounter with the Wonderful Wizard of Oz, their friendship
        reaches a crossroads.
      </p>
      <div className="flex gap-2 h-10 w-36.25 bg-white justify-center items-center rounded-lg text-black px-2 py-4">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.33301 2L12.6663 8L3.33301 14V2Z"
            stroke="#18181B"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Watch Trailer
      </div>
    </div>
      </div>
    </div>
  )
}
