"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useCallback } from "react";
import { Movie } from "../types";
import { tmdb } from "@/lib/tmdb";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const fetchSuggestions = useCallback((query: string) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (!query.trim()) {
      setSuggestions([]);
      setIsSuggestionsVisible(false);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    debounceTimer.current = setTimeout(() => {
      tmdb
        .get("/search/movie", { params: { query, page: 1 } })
        .then((res) => {
          setSuggestions(res.data.results.slice(0, 6));
          setIsSuggestionsVisible(true);
          setIsSearching(false);
          setSelectedIndex(-1);
        })
        .catch(() => setIsSearching(false));
    }, 300);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    fetchSuggestions(val);
  };

  const doSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchQuery("");
    setSuggestions([]);
    setIsSuggestionsVisible(false);
    setSelectedIndex(-1);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleSuggestionClick = (movie: Movie) => {
    setSearchQuery("");
    setSuggestions([]);
    setIsSuggestionsVisible(false);
    router.push(`/movies/${movie.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        doSearch(searchQuery);
      }
    } else if (e.key === "Escape") {
      setIsSuggestionsVisible(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative flex items-center pl-8 h-9 w-94.75 border-gray-300 border rounded-lg ">
        {isSearching ? (
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 animate-spin"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="#d1d5db" strokeWidth="3" />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              stroke="#09090B"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.7998 0.5C7.17456 0.5 9.0995 2.42507 9.09961 4.7998C9.09961 5.81543 8.74857 6.74777 8.16016 7.4834L7.87988 7.83301L11.2236 11.1768C11.23 11.1833 11.2334 11.1917 11.2334 11.2002L11.2236 11.2236C11.2106 11.2365 11.1898 11.2364 11.1768 11.2236L7.83301 7.87988L7.4834 8.16016C6.74777 8.74857 5.81543 9.09961 4.7998 9.09961C2.42507 9.0995 0.5 7.17456 0.5 4.7998C0.500106 2.42514 2.42514 0.500106 4.7998 0.5ZM4.7998 0.566406C2.46195 0.566512 0.566512 2.46195 0.566406 4.7998C0.566406 7.13775 2.46189 9.0331 4.7998 9.0332C7.13781 9.0332 9.0332 7.13781 9.0332 4.7998C9.0331 2.46189 7.13775 0.566406 4.7998 0.566406Z"
              fill="#09090B"
              stroke="currentColor"
            />
          </svg>
        )}
        <input
          className="text-sm outline-none w-full pr-3"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => {
            if (suggestions.length > 0) setIsSuggestionsVisible(true);
          }}
          onKeyDown={handleKeyDown}
        />
      </div>

      {isSuggestionsVisible && suggestions.length > 0 && (
        <div className="absolute top-11 left-0 w-full min-w-[360px] bg-white border border-[#E4E4E7] rounded-lg shadow-lg z-40 overflow-hidden  dark:bg-black">
          {suggestions.map((movie, index) => (
            <button
              key={movie.id}
              onClick={() => handleSuggestionClick(movie)}
              className={`w-full flex items-center gap-3 px-3 py-2 transition-colors cursor-pointer text-left ${
                index === selectedIndex ? "bg-gray-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="w-9 h-[54px] rounded overflow-hidden bg-gray-100 shrink-0">
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 text-[8px] ">
                    N/A
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#09090B] truncate  dark:text-white">
                  {movie.title}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5 text-sm">
                  {movie.release_date && (
                    <span className="text-xs text-[#71717A]">
                      {movie.release_date.slice(0, 4)}
                    </span>
                  )}
                  {movie.vote_average > 0 && (
                    <>
                      <span className="text-[#E4E4E7] text-xs">·</span>
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
                        <p className="text-[#09090B] text-sm font-medium  dark:text-white">
                          {movie.vote_average.toFixed(1)}
                          <span className="text-xs text-[#71717A]">/10</span>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 text-[#71717A]"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}

          <button
            onClick={() => doSearch(searchQuery)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border-t border-[#E4E4E7] text-xs hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            See all results for &quot;{searchQuery}&quot;
            <svg
              width="12"
              height="12"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12L10 8L6 4"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
