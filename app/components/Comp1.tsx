"use client"
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MovieSummary } from "@/app/types";
import Link from "next/link";
import axios from "axios";

const API_KEY = "d67d8bebd0f4ff345f6505c99e9d0289";
const BASE_URL = "https://api.themoviedb.org/3";

export const Comp1 = () => {
  const [trending, setTrending] = useState<MovieSummary[]>([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`)
      .then((res) => setTrending(res.data.results.slice(0, 10)));
  }, []);

  if (trending.length === 0)
    return <div className="h-[600px] bg-gray-200 animate-pulse" />;

  return (
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
          <div className="h-[600px] flex items-center relative">
            {/* Backdrop image */}
            <img
              className="absolute left-0 top-0 w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="relative text-white space-y-4 pl-[140px] max-w-[480px]">
              <div>
                <p className="text-base">Now playing:</p>
                <p className="text-4xl font-bold">{movie.title}</p>
              </div>

              <div className="flex items-center gap-1">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.1667 0.5L15.7717 7.80333L23.8333 8.98167L18 14.6633L19.3767 22.69L12.1667 18.8983L4.95667 22.69L6.33333 14.6633L0.5 8.98167L8.56167 7.80333L12.1667 0.5Z"
                    fill="#FDE047" stroke="#FDE047" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
                <p>{movie.vote_average.toFixed(1)}/10</p>
              </div>

              <p className="text-sm leading-relaxed line-clamp-3">{movie.overview}</p>

              <Link href={`/movies/${movie.id}`}>
                <div className="flex gap-2 h-10 w-[145px] bg-white justify-center items-center rounded-lg text-black px-2 py-4 cursor-pointer hover:bg-gray-100 transition">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.33301 2L12.6663 8L3.33301 14V2Z" stroke="#18181B" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Watch Trailer
                </div>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};