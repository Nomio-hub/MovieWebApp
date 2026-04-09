import React from 'react'

export const Header = () => {
  return (
    <div className="h-14.75 w-full flex justify-between items-center px-16">
      <div className="flex gap-2">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.83335 1.6665V18.3332M14.1667 1.6665V18.3332M1.66669 9.99984H18.3334M1.66669 5.83317H5.83335M1.66669 14.1665H5.83335M14.1667 14.1665H18.3334M14.1667 5.83317H18.3334M3.48335 1.6665H16.5167C17.52 1.6665 18.3334 2.47985 18.3334 3.48317V16.5165C18.3334 17.5198 17.52 18.3332 16.5167 18.3332H3.48335C2.48004 18.3332 1.66669 17.5198 1.66669 16.5165V3.48317C1.66669 2.47985 2.48004 1.6665 3.48335 1.6665Z"
            stroke="#4338CA"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-indigo-700 font-bold text-base">Movie Z</p>
      </div>
      <div className="flex gap-2">
        <button className="flex justify-center items-center h-9 w-24.25 gap-2 border-gray-300 border-1 rounded-lg">
          <svg
            width="9"
            height="5"
            viewBox="0 0 9 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 0.5L4.5 4.5L8.5 0.5"
              stroke="#18181B"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p >Genre</p>
        </button>
        <input
          className="flex justify-center items-center h-9 w-94.75 gap-2
          border-gray-300 border rounded-lg"
          type="search"
        ></input>
      </div>
      <div className="w-9 h-9 rounded-lg border-gray-300 border flex justify-center items-center">
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.5 0.5C5.70435 1.29565 5.25736 2.37478 5.25736 3.5C5.25736 4.62522 5.70435 5.70435 6.5 6.5C7.29565 7.29565 8.37478 7.74264 9.5 7.74264C10.6252 7.74264 11.7044 7.29565 12.5 6.5C12.5 7.68669 12.1481 8.84673 11.4888 9.83342C10.8295 10.8201 9.89246 11.5892 8.7961 12.0433C7.69975 12.4974 6.49335 12.6162 5.32946 12.3847C4.16558 12.1532 3.09648 11.5818 2.25736 10.7426C1.41825 9.90353 0.846802 8.83443 0.615291 7.67054C0.38378 6.50666 0.5026 5.30026 0.956725 4.2039C1.41085 3.10754 2.17989 2.17047 3.16658 1.51118C4.15328 0.851894 5.31331 0.5 6.5 0.5Z"
            stroke="#18181B"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
