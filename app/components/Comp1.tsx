"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MovieSummary } from "@/app/types";
import axios from "axios";

const API_KEY = "d67d8bebd0f4ff345f6505c99e9d0289";
const BASE_URL = "https://api.themoviedb.org/3";

export const Comp1 = () => {
  const [trending, setTrending] = useState<MovieSummary[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [trailerTitle, setTrailerTitle] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
      .then((res) => setTrending(res.data.results.slice(0, 10)));
  }, []);

  const handleWatchTrailer = async (movieId: number, movieTitle: string) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
      );
      const trailer = res.data.results?.find(
        (v: any) => v.type === "Trailer" && v.site === "YouTube",
      );
      if (trailer) {
        setTrailerKey(trailer.key);
        setTrailerTitle(movieTitle);
      }
    } catch (e) {
      console.error("Trailer fetch failed", e);
    }
  };

  if (trending.length === 0)
    return <div className="h-150 bg-gray-200 animate-pulse" />;

  return (
    <>
      <Swiper
        className="mySwiper"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={0}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {trending.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="h-150 flex items-center relative">
              <img
                className="absolute left-0 top-0 w-full h-full object-cover"
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
              />
              <div className="absolute inset-0 bg-black/50" />

              <div className="relative text-white space-y-4 pl-35 max-w-120">
                <div>
                  <p className="text-base">Now playing:</p>
                  <p className="text-4xl font-bold">{movie.title}</p>
                </div>

                <div className="flex items-center gap-1">
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path
                      d="M12.1667 0.5L15.7717 7.80333L23.8333 8.98167L18 14.6633L19.3767 22.69L12.1667 18.8983L4.95667 22.69L6.33333 14.6633L0.5 8.98167L8.56167 7.80333L12.1667 0.5Z"
                      fill="#FDE047"
                      stroke="#FDE047"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>
                    {movie.vote_average.toFixed(1)}
                    <span className="text-base text-[#71717A]">/10</span>
                  </p>
                </div>

                <p className="text-sm leading-relaxed line-clamp-3">
                  {movie.overview}
                </p>

                <button
                  onClick={() => handleWatchTrailer(movie.id, movie.title)}
                  className="flex gap-2 h-10 w-[145px] bg-white justify-center items-center rounded-lg text-black px-2 py-4 cursor-pointer hover:bg-gray-100 transition"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3.33301 2L12.6663 8L3.33301 14V2Z"
                      stroke="#18181B"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Watch Trailer
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {trailerKey && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setTrailerKey(null)}
        >
          <div
            className="relative w-225 max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black flex justify-between items-center px-4 py-3">
              <p className="text-white font-semibold">
                {trailerTitle}: Trailer
              </p>
              <button
                onClick={() => setTrailerKey(null)}
                className="text-white text-xl hover:text-gray-300 transition"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title="Trailer"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
