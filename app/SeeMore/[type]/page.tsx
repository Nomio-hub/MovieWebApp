"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Header } from "@/app/components/Header";
import Link from "next/link";
import { Footer } from "@/app/components/Footer";

const API_KEY = "d67d8bebd0f4ff345f6505c99e9d0289";
const BASE_URL = "https://api.themoviedb.org/3";

const TYPE_MAP: Record<string, { endpoint: string; label: string }> = {
  upcoming: { endpoint: "upcoming", label: "Upcoming" },
  "now-playing": { endpoint: "now_playing", label: "Now Playing" },
  "top-rated": { endpoint: "top_rated", label: "Top Rated" },
  popular: { endpoint: "popular", label: "Popular" },
};

export default function MovieTypePage() {
  const { type } = useParams<{ type: string }>();
  const config = TYPE_MAP[type] ?? { endpoint: type, label: type };

  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setMovies([]);
    axios
      .get(`${BASE_URL}/movie/${config.endpoint}`, {
        params: { api_key: API_KEY, page },
      })
      .then((res) => {
        setMovies(res.data.results);
        setTotalPages(Math.min(res.data.total_pages, 500));
      });
  }, [type, page]);

  return (
    <div>
      <Header />
      <div className="px-35 py-10 dark:text-white">
        <h1 className="text-2xl font-semibold mb-8">{config.label}</h1>
        <div className="grid grid-cols-5 gap-4">
          {movies.map((movie) => (
            <Link
              href={`/movies/${movie.id}`}
              key={movie.id}
              className="rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full object-cover rounded-lg"
              />
              <div className="pt-2">
                <p className="text-sm text-yellow-400">
                  ⭐ {movie.vote_average.toFixed(1)}
                  <span className="text-gray-400">/10</span>
                </p>
                <p className="text-sm font-medium">{movie.title}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-40 dark:border-gray-600"
          >
            Previous
          </button>

          <span className="px-4 py-2">
            {page} / {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-40 dark:border-gray-600"
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
