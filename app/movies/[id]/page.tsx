"use client";
import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useParams } from "next/navigation";
import {
  CastMember,
  CrewMember,
  MovieDetail,
  MovieListResponse,
  Video,
} from "../../types";
import { When } from "@/app/components/When";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const page = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [similar, setSimilar] = useState<MovieListResponse | null>(null);
  const [directors, setDirectors] = useState<string[]>([]);
  const [writers, setWriters] = useState<string[]>([]);
  const [stars, setStars] = useState<string[]>([]);
  const [trailer, setTrailer] = useState<Video | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=d67d8bebd0f4ff345f6505c99e9d0289`,
    )
      .then((res) => res.json())
      .then((data) => {
        const crew: CrewMember[] = data.crew || [];
        const cast: CastMember[] = data.cast || [];
        setDirectors(
          crew.filter((c) => c.job === "Director").map((c) => c.name),
        );
        setWriters(
          crew
            .filter((c) => ["Writer", "Screenplay", "Story"].includes(c.job))
            .slice(0, 3)
            .map((c) => c.name),
        );
        setStars(cast.slice(0, 3).map((c) => c.name));
      });
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=d67d8bebd0f4ff345f6505c99e9d0289`,
    )
      .then((res) => res.json())
      .then((data) => {
        const videos: Video[] = data.results || [];
        const found =
          videos.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
          videos.find((v) => v.site === "YouTube") ||
          null;
        setTrailer(found);
      });
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=d67d8bebd0f4ff345f6505c99e9d0289`,
    )
      .then((res) => res.json())
      .then((data) => setSimilar(data));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    let statusCode = 200;
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=d67d8bebd0f4ff345f6505c99e9d0289`,
    )
      .then((res) => {
        if (res.status !== 200) statusCode = res.status;
        return res.json();
      })
      .then((data) => {
        if (statusCode === 200) {
          setMovie(data);
        } else {
          setError(data.status_message || data.message);
        }
        setLoading(false);
      });
  }, [id]);

  if (error)
    return (
      <div className="w-full py-20 text-center text-2xl text-red-500">
        {error}
      </div>
    );
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (!movie)
    return (
      <div className="flex justify-center items-center h-screen">
        Movie not found
      </div>
    );

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : posterUrl;

  const formatVoteCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}`;
    return String(count);
  };

  const formatRuntime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <div>
      <Header />
      <div className="contain pt-13 pb-20">
        <div className="flex flex-col gap-8">
          <div className="space-y-8">
            <div className="flex justify-between">
              <div>
                <p className="font-bold text-4xl">{movie.title}</p>
                <p>
                  {movie.release_date}
                  <span> · {movie.original_language?.toUpperCase()}</span>
                  <span> · {formatRuntime(movie.runtime)}</span>
                </p>
              </div>
              <div>
                <p>Rating</p>
                <div className="flex items-center gap-1">
                  <img src="/star.svg" alt="" />
                  <div>
                    <p>
                      {movie.vote_average.toFixed(1)}
                      <span className="text-base text-[#71717A]">/10</span>
                    </p>
                    <p className="text-xs text-[#71717A]">
                      {formatVoteCount(movie.vote_count)}k
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-107 flex gap-8 ">
              <div className="w-72.5 rounded-sm overflow-hidden">
                <img
                  className="w-full h-full object-cover "
                  src={posterUrl}
                  alt={movie.title}
                />
              </div>
              <div className="w-190 h-[428px] rounded-sm overflow-hidden relative pt-80  flex justify-between">
                <img
                  className="w-full h-full object-cover absolute inset-0"
                  src={backdropUrl}
                  alt={movie.title}
                />

                {trailer && (
                  <div className="flex gap-3 relative pl-5">
                    <a
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <button className="rounded-full bg-white h-10 w-10 flex items-center justify-center">
                        <img className="px-3 py-2" src="/play.svg" alt="" />
                      </button>
                      <p className="text-base text-white">Play trailer</p>
                    </a>
                  </div>
                )}
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex gap-3 relative items-center pr-5">
                      <button className="rounded-full bg-white h-10 w-10 flex items-center justify-center">
                        <img className="px-3 py-2" src="/play.svg" alt="" />
                      </button>
                      <p className="text-base text-white">Watch movie</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent
                    showCloseButton={false}
                    className="min-w-5xl h-[650px]"
                  >
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                      <DialogDescription></DialogDescription>
                      <iframe
                        src={"https://www.vidking.net/embed/movie/" + id}
                        width="100%"
                        height="600"
                        allowFullScreen
                      ></iframe>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex gap-3">
              {movie.genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/genre/${genre.id}?name=${encodeURIComponent(genre.name)}`}
                  className="border border-[#E4E4E7] rounded-full text-xs font-semibold px-[10px] py-[2px] hover:bg-gray-50 transition-colors"
                >
                  {genre.name}
                </Link>
              ))}
            </div>
            <div>
              <p className="text-base font-normal">{movie.overview}</p>
            </div>
            <div className="flex flex-col gap-5">
              {directors.length > 0 && (
                <div className="flex gap-[53px] border-b border-[#E4E4E7] p-1">
                  <p className="text-base font-bold w-[64px]">Director</p>
                  <p>{directors.join(" · ")}</p>
                </div>
              )}
              {writers.length > 0 && (
                <div className="flex gap-[53px] border-b border-[#E4E4E7] p-1">
                  <p className="text-base font-bold w-[64px]">Writers</p>
                  <p>{writers.join(" · ")}</p>
                </div>
              )}
              {stars.length > 0 && (
                <div className="flex gap-[53px] border-b border-[#E4E4E7] p-1">
                  <p className="text-base font-bold w-[64px]">Stars</p>
                  <p>{stars.join(" · ")}</p>
                </div>
              )}
            </div>
          </div>

          <div>
            {similar && similar.results && similar.results.length > 0 && (
              <div>
                <When when="More like this" />
                <div className="grid grid-cols-5 gap-4">
                  {similar.results.slice(0, 5).map((movie) => (
                    <Link
                      href={`/movies/${movie.id}`}
                      key={movie.id}
                      className="flex flex-col gap-2 cursor-pointer group"
                    >
                      <div className="rounded-sm overflow-hidden aspect-2/3">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          src={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                              : "/placeholder.jpg"
                          }
                          alt={movie.title}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <img src="/star.svg" alt="star" className="w-4 h-4" />
                          <span className="text-sm font-semibold">
                            {movie.vote_average.toFixed(1)}
                          </span>
                          <span className="text-xs text-[#71717A]">/10</span>
                        </div>
                        <p className="text-sm font-medium line-clamp-2">
                          {movie.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
