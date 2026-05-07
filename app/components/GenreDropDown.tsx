"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { Genre } from "../types";
import { tmdb } from "@/lib/tmdb";

export const GenreDropdown = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isGenreVisible, setIsGenreVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    tmdb.get("/genre/movie/list").then((res) => {
      setGenres(res.data.genres);
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsGenreVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGenreClick = (genre: Genre) => {
    setIsGenreVisible(false);
    router.push(`/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsGenreVisible(!isGenreVisible)}
        className="flex gap-2 items-center font-medium text-[#181818] h-9 w-24.25 border px-4 border-[#E4E4E7] rounded-[10px] shadow-xs cursor-pointer hover:opacity-80"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="#7D7575"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-sm dark:text-[#FAFAFA]">Genre</p>
      </button>

      <div
        data-shown={isGenreVisible}
        className="absolute duration-300 top-12 w-[577px] left-0 z-30 p-5 bg-white border border-[#E4E4E7] rounded-lg mt-1 data-[shown=true]:visible data-[shown=true]:opacity-100 invisible opacity-0  dark:bg-black"
      >
        <div className="mt-1 font-semibold text-2xl text-[#09090B]  dark:text-white">
          Genres
        </div>
        <div className="text-[#09090B]  dark:text-white">
          See lists of movies by genre
        </div>
        <hr className="border border-[#E4E4E7] my-4" />
        <div className="flex flex-wrap gap-4 max-w-135  dark:bg-black">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre)}
              className="border cursor-pointer hover:opacity-80 duration-300 text-xs font-semibold py-0.5 pl-2.5 pr-1 border-[#E4E4E7] rounded-full flex items-center gap-2"
            >
              {genre.name}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="#09090B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
