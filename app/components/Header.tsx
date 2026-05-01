"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Genre, Movie } from "../types";
import { tmdb } from "@/lib/tmdb";

export const Header = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isGenreVisible, setIsGenreVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    tmdb.get("/genre/movie/list").then((res) => {
      setGenres(res.data.genres);
    });
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsGenreVisible(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSuggestionsVisible(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions with 300ms debounce
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
    setIsGenreVisible(false);
    setSelectedIndex(-1);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleSuggestionClick = (movie: Movie) => {
    setSearchQuery("");
    setSuggestions([]);
    setIsSuggestionsVisible(false);
    router.push(`/movie/${movie.id}`);
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

  const handleGenreClick = (genre: Genre) => {
    setIsGenreVisible(false);
    router.push(`/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`);
  };

  return (
    <div className="container">
      <div className="py-[11.5px] flex justify-between items-center">
        <Link href={"/"}>
          <svg
            width="93"
            height="20"
            viewBox="0 0 93 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.83366 1.6665V18.3332M14.167 1.6665V18.3332M1.66699 9.99984H18.3337M1.66699 5.83317H5.83366M1.66699 14.1665H5.83366M14.167 14.1665H18.3337M14.167 5.83317H18.3337M3.48366 1.6665H16.517C17.5203 1.6665 18.3337 2.47985 18.3337 3.48317V16.5165C18.3337 17.5198 17.5203 18.3332 16.517 18.3332H3.48366C2.48034 18.3332 1.66699 17.5198 1.66699 16.5165V3.48317C1.66699 2.47985 2.48034 1.6665 3.48366 1.6665Z"
              stroke="#4338CA"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M30.2159 4.36364H33.25L35.1648 12.1818H35.3011L39.7955 4.36364H42.8295L40.8977 16H38.5114L39.7727 8.42614H39.6705L35.4205 15.9432H33.7898L32.0398 8.39773H31.9432L30.6705 16H28.2841L30.2159 4.36364ZM47.1538 16.1705C46.2637 16.1705 45.5269 15.9811 44.9436 15.6023C44.3602 15.2197 43.9493 14.6894 43.7106 14.0114C43.4758 13.3295 43.4322 12.536 43.5799 11.6307C43.7239 10.7367 44.0231 9.95455 44.4777 9.28409C44.9322 8.61364 45.5099 8.0928 46.2106 7.72159C46.9114 7.34659 47.7012 7.15909 48.5799 7.15909C49.4663 7.15909 50.2012 7.35038 50.7845 7.73295C51.3678 8.11174 51.7788 8.64205 52.0174 9.32386C52.2561 10.0057 52.3015 10.7992 52.1538 11.7045C52.0061 12.5947 51.703 13.375 51.2447 14.0455C50.7864 14.7159 50.2087 15.2386 49.5118 15.6136C48.8148 15.9848 48.0288 16.1705 47.1538 16.1705ZM47.3924 14.2955C47.8015 14.2955 48.1633 14.1799 48.4777 13.9489C48.7959 13.714 49.0591 13.3958 49.2674 12.9943C49.4796 12.589 49.6273 12.1307 49.7106 11.6193C49.794 11.1155 49.7996 10.6686 49.7277 10.2784C49.6557 9.88447 49.5042 9.57386 49.2731 9.34659C49.0459 9.11932 48.7334 9.00568 48.3356 9.00568C47.9265 9.00568 47.5629 9.12311 47.2447 9.35795C46.9265 9.58902 46.6633 9.9072 46.4549 10.3125C46.2466 10.7178 46.1008 11.178 46.0174 11.6932C45.9379 12.1932 45.9322 12.6402 46.0004 13.0341C46.0686 13.4242 46.2182 13.733 46.4493 13.9602C46.6803 14.1837 46.9947 14.2955 47.3924 14.2955ZM62.6414 7.27273L58.1357 16H55.4085L53.8119 7.27273H56.2778L57.0505 13.517H57.1414L59.988 7.27273H62.6414ZM62.7455 16L64.2001 7.27273H66.6205L65.166 16H62.7455ZM65.6603 6.13636C65.3004 6.13636 65.0031 6.01705 64.7682 5.77841C64.5372 5.53598 64.4425 5.24811 64.4841 4.91477C64.5258 4.57386 64.6887 4.28598 64.9728 4.05114C65.2569 3.8125 65.5788 3.69318 65.9387 3.69318C66.2985 3.69318 66.5921 3.8125 66.8194 4.05114C67.0466 4.28598 67.1413 4.57386 67.1035 4.91477C67.0656 5.24811 66.9046 5.53598 66.6205 5.77841C66.3402 6.01705 66.0201 6.13636 65.6603 6.13636ZM71.3794 16.1705C70.4855 16.1705 69.745 15.9886 69.1578 15.625C68.5707 15.2576 68.1578 14.7386 67.9192 14.0682C67.6844 13.3939 67.6446 12.5966 67.7999 11.6761C67.9514 10.7784 68.2563 9.99053 68.7147 9.3125C69.1768 8.63447 69.7563 8.10606 70.4533 7.72727C71.1503 7.34848 71.9268 7.15909 72.7828 7.15909C73.3586 7.15909 73.8794 7.25189 74.3453 7.4375C74.815 7.61932 75.2052 7.89583 75.5158 8.26705C75.8264 8.63447 76.0385 9.0947 76.1522 9.64773C76.2696 10.2008 76.2677 10.8485 76.1465 11.5909L76.0385 12.2557H68.6749L68.9078 10.7557H73.9987C74.0556 10.4072 74.0328 10.0985 73.9306 9.82955C73.8283 9.56061 73.6578 9.35038 73.4192 9.19886C73.1806 9.04356 72.887 8.96591 72.5385 8.96591C72.1825 8.96591 71.8491 9.05303 71.5385 9.22727C71.2279 9.40151 70.9666 9.63068 70.7544 9.91477C70.5461 10.1951 70.4116 10.5 70.351 10.8295L70.084 12.3182C70.0082 12.7765 70.0234 13.1572 70.1294 13.4602C70.2393 13.7633 70.4287 13.9905 70.6976 14.142C70.9666 14.2898 71.3075 14.3636 71.7203 14.3636C71.9893 14.3636 72.2412 14.3258 72.476 14.25C72.7147 14.1742 72.9268 14.0625 73.1124 13.9148C73.298 13.7633 73.4495 13.5758 73.5669 13.3523L75.7772 13.5C75.5726 14.0379 75.262 14.5076 74.8453 14.9091C74.4287 15.3068 73.9268 15.6174 73.3397 15.8409C72.7563 16.0606 72.1029 16.1705 71.3794 16.1705ZM81.2666 16L81.5166 14.5398L88.6814 6.39205H82.8461L83.187 4.36364H92.0961L91.8518 5.82386L84.6814 13.9716H90.5166L90.1757 16H81.2666Z"
              fill="#4338CA"
            />
          </svg>
        </Link>

        <div className="flex gap-3">
          {/* Genre dropdown — its own ref so it doesn't interfere with search */}
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
              <p className="text-sm">Genre</p>
            </button>

            <div
              data-shown={isGenreVisible}
              className="absolute duration-300 top-12 left-0 z-30 p-5 bg-white border border-[#E4E4E7] rounded-lg mt-1 data-[shown=true]:visible data-[shown=true]:opacity-100 invisible opacity-0"
            >
              <div className="mt-1 font-semibold text-2xl text-[#09090B]">
                Genres
              </div>
              <div className="text-[#09090B]">See lists of movies by genre</div>
              <hr className="border border-[#E4E4E7] my-4" />
              <div className="flex flex-wrap gap-4 max-w-135">
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

          {/* Search with live suggestions */}
          <div className="relative" ref={searchRef}>
            <div className="relative flex items-center pl-8 h-9 w-94.75 border-gray-300 border rounded-lg">
              {isSearching ? (
                // Spinner while fetching
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 animate-spin"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#d1d5db"
                    strokeWidth="3"
                  />
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
                    stroke="#09090B"
                  />
                </svg>
              )}
              <input
                className="text-sm outline-none w-full pr-3"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => {
                  setIsGenreVisible(false);
                  if (suggestions.length > 0) setIsSuggestionsVisible(true);
                }}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Suggestions dropdown */}
            {isSuggestionsVisible && suggestions.length > 0 && (
              <div className="absolute top-11 left-0 w-full min-w-[360px] bg-white border border-[#E4E4E7] rounded-lg shadow-lg z-40 overflow-hidden">
                {suggestions.map((movie, index) => (
                  <button
                    key={movie.id}
                    onClick={() => handleSuggestionClick(movie)}
                    className={`w-full flex items-center gap-3 px-3 py-2 transition-colors cursor-pointer text-left ${
                      index === selectedIndex
                        ? "bg-gray-50"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {/* Poster thumbnail */}
                    <div className="w-9 h-[54px] rounded overflow-hidden bg-gray-100 shrink-0">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-[8px]">
                          N/A
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#09090B] truncate">
                        {movie.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
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
                              <p className=" text-[#09090B] text-sm font-medium">
                                {movie.vote_average.toFixed(1)}
                                <span className="text-xs text-[#71717A]">
                                  /10
                                </span>
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <link href={`/movies/${movie.id}`}>
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
                    </link>
                  </button>
                ))}

                {/* See all results footer */}
                <button
                  onClick={() => doSearch(searchQuery)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border-t border-[#E4E4E7] text-xs  hover:bg-indigo-50 transition-colors cursor-pointer"
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
        </div>

        <div>
          <button className="p-2.5 border border-[#E4E4E7] rounded-[10px] shadow-xs cursor-pointer hover:opacity-80">
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
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
