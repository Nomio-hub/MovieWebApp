"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { tmdb } from "@/lib/tmdb";
import Link from "next/link";
import { Genre, Movie } from "@/app/types";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";

export default function GenrePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const genreId = params.id as string;
  const genreName = searchParams.get("name") || "Movies";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    tmdb.get("/genre/movie/list").then((res) => {
      setGenres(res.data.genres);
    });
  }, []);

  useEffect(() => {
    setPage(1);
  }, [genreId]);

  useEffect(() => {
    setLoading(true);
    tmdb
      .get("/discover/movie", {
        params: {
          with_genres: genreId,
          page,
          sort_by: "popularity.desc",
        },
      })
      .then((res) => {
        setMovies(res.data.results);
        setTotalResults(res.data.total_results);
        setTotalPages(Math.min(res.data.total_pages, 500));
        setLoading(false);
      });
  }, [genreId, page]);

  const getPaginationPages = () => {
    const delta = 2;
    const start = Math.max(1, Math.min(page - delta, totalPages - delta * 2));
    const end = Math.min(totalPages, start + delta * 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="container dark:text-white">
      <Header />
      <h2 className="text-3xl font-semibold pt-8 pb-4">Search filter</h2>
      <div className="flex">
        <div>
          <p className="text-2xl font-semibold">Genres</p>
          <p className="text-base pb-2">See lists of movies by genre</p>
          <div className="flex flex-wrap gap-4 max-w-[387px]  dark:text-white">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() =>
                  router.push(
                    `/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`,
                  )
                }
                className={`border cursor-pointer hover:opacity-80 duration-300 text-xs font-semibold py-0.5 pl-2.5 pr-1 rounded-full flex items-center gap-2 ${
                  String(genre.id) === String(genreId)
                    ? "bg-[#09090B] text-white border-[#09090B]"
                    : "border-[#E4E4E7]"
                }`}
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
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold pb-8">
            {totalResults.toLocaleString()} titles in &quot;{genreName}&quot;
          </h1>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg aspect-[2/3] mb-2" />
                  <div className="bg-gray-200 h-4 rounded w-3/4 mb-1" />
                  <div className="bg-gray-200 h-3 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-12">
                {movies.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movies/${movie.id}`}
                    className="group"
                  >
                    <div className="overflow-hidden rounded-lg max-w-[165px] bg-gray-100 flex flex-col dark:bg-[#27272A]">
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-300 dark:text-white"
                        />
                      ) : (
                        <div className="w-full aspect-[2/3] flex items-center justify-center text-gray-400 text-sm text-center p-2">
                          No Image
                        </div>
                      )}
                      <div className="p-2">
                        <div className="flex gap-1 items-center">
                          ⭐
                          <p className="text-[#09090B] text-sm font-medium dark:text-white">
                            {movie.vote_average.toFixed(1)}
                            <span className="text-xs text-[#71717A]">/10</span>
                          </p>
                        </div>
                        <p className="mt-1 text-base font-medium text-[#09090B] line-clamp-2 dark:text-white">
                          {movie.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex justify-center items-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm border border-[#E4E4E7] rounded-lg disabled:opacity-40 hover:bg-gray-50 cursor-pointer"
                >
                  Previous
                </button>

                {getPaginationPages().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 text-sm rounded-lg border cursor-pointer ${
                      pageNum === page
                        ? "bg-[#E4E4E7] border-black"
                        : "border-[#E4E4E7] hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 text-sm border border-[#E4E4E7] rounded-lg disabled:opacity-40 hover:bg-gray-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
