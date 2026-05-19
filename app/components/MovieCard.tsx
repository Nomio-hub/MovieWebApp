"use client";
import { MovieSummary } from "@/app/types";
import Link from "next/link";

export const MovieCard = ({ upcoming }: { upcoming: MovieSummary }) => {
  return (
    <Link href={`/movies/${upcoming.id}`}>
      <div className="w-[229.73px] h-109.75 bg-[#F4F4F5] rounded-lg overflow-hidden gap-1 dark:bg-[#27272A] dark:text-white">
        <img
          className="w-full h-85 object-cover group-hover:scale-105 transition-transform duration-300"
          src={`https://image.tmdb.org/t/p/w500${upcoming.poster_path}`}
          alt=""
        />
        <div className="p-2">
          <div className="flex gap-1 items-center">
            <svg
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.16667 0.5L9.22667 4.67333L13.8333 5.34667L10.5 8.59333L11.2867 13.18L7.16667 11.0133L3.04667 13.18L3.83333 8.59333L0.5 5.34667L5.10667 4.67333L7.16667 0.5Z"
                fill="#FDE047"
                stroke="#FDE047"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className=" text-[#09090B] text-sm font-medium  dark:text-white">
              {upcoming.vote_average.toFixed(1)}
              <span className="text-xs text-[#71717A]">/10</span>
            </p>
          </div>
          <p className="text-[#09090B]  dark:text-white font-normal text-lg">
            {upcoming.title}
          </p>
        </div>
      </div>
    </Link>
  );
};
