'use client'
import React, { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { useParams } from 'next/navigation';
import { MovieDetail, MovieListResponse } from '../../types';
import { When } from '@/app/components/When';

const page = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [similar, setSimilar] = useState <MovieListResponse | null>(null);


  useEffect(() => {
  if (!id) return;
  fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=d67d8bebd0f4ff345f6505c99e9d0289`)
    .then(res => res.json())
    .then(data => setSimilar(data));
}, [id]);

  useEffect(() => {
    let statusCode = 200;
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d67d8bebd0f4ff345f6505c99e9d0289`)
      .then((res) => {
        if (res.status !== 200) {
          statusCode = res.status;
        }
        return res.json();
      })
      .then((data) => {
        if (statusCode == 200) {
          setMovie(data);
          setShowTrailer(data.thumbnail);
        } else {
          setError(data.message);
        }
        setLoading(false);
      });
  }, [id]);

  if (error) {
    return <div className="w-full py-20 text-center text-2xl text-red-500">{error}</div>;
  }
  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!movie) return <div className="flex justify-center items-center h-screen">Movie not found</div>;

 const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.jpg';

  // Арын зураг (backdrop)
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : posterUrl;

  return (
    <div>
      <Header/>
      <div className='contain pt-13 pb-20'>
        <div className='flex flex-col gap-8'>
        <div className='space-y-8'>
          <div className='flex justify-between'>
            <div>
              <p className='font-bold text-4xl'>{movie.title}</p>
              <p>{movie.release_date}<span> · {movie.original_language}</span><span> · {movie.runtime}</span></p>
            </div>
            <div>
              <p>Rating</p>
               <div className='flex'>
                <img src="/star.svg" alt="" />
               <div>
                <p>{movie.vote_average.toFixed(1)}<span className='text-base text-[#71717A]'>/10</span>
                </p>
                <p>37k</p>
               </div>
               </div>
            </div>
          </div>
          <div className='h-107 flex gap-8'>
            <div className='w-72.5 rounded-sm overflow-hidden'>
              <img className='w-full h-full object-cover' src={posterUrl} alt={movie.title} /></div>
            <div className='w-190 rounded-sm overflow-hidden relative'>
              <img className='w-full h-full object-cover absolute inset-0' src={backdropUrl}
                    alt={movie.title} />
            <div className='flex pt-91 gap-3 w-43.5 h-10 relative items-center justify-center'>
              <button className='rounded-full bg-white h-10 w-10'><img className=' px-4 py-2' src="/play.svg" alt="" /></button>
              <p className='text-base text-white'>Play trailer</p>
              <p className='text-sm text-white'>2:35</p>
            </div>
            </div>
            
          </div>
        </div>
        
        <div className='space-y-5'>
          <div className='flex gap-3'>
            {movie.genres.map((genre) =>(
              <div key={genre.id} className='border border-[#E4E4E7] rounded-full text-xs font-semibold px-[10px] py-[2px]'>{genre.name}</div>
            ))}
          </div>
          <div>
            <p className='text-base font-normal'>{movie.overview} </p>
          </div>
          <div className='flex flex-col gap-5'>
            <div className='flex gap-[53px] border-b border-[#E4E4E7] p-1'>
              <p className='text-base font-bold w-[64px]'>Director</p>
              <p>jon M.Chu</p>
            </div>
            <div className='flex gap-[53px] border-b border-[#E4E4E7]  p-1'>
              <p className='text-base font-bold w-[64px]'>Writers</p>
              <p>Winnie Holzman ·  Dana Fox · Gregory Maguire</p>
            </div>
            <div className='flex gap-[53px] border-b border-[#E4E4E7]  p-1'>
              <p className='text-base font-bold w-[64px]'>Stars</p>
              <p>Cynthia Erivo ·  Ariana Grande · Jeff Goldblum</p>
            </div>
          </div>
        </div>
        <div>
      
{similar && similar.results && similar.results.length > 0 && (
  <div>
    <When when='More like this'/>
    <div className='grid grid-cols-5 gap-4'>
      {similar.results.slice(0, 5).map((movie) => (
        <a href={`/movie/${movie.id}`} key={movie.id} className='flex flex-col gap-2 cursor-pointer group'>
          <div className='rounded-sm overflow-hidden aspect-2/3'>
            <img
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
              src={movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : '/placeholder.jpg'}
              alt={movie.title}
            />
          </div>
          <div>
            <div className='flex items-center gap-1'>
              <img src="/star.svg" alt="star" className='w-4 h-4' />
              <span className='text-sm font-semibold'>{movie.vote_average.toFixed(1)}</span>
              <span className='text-xs text-[#71717A]'>/10</span>
            </div>
            <p className='text-sm font-medium line-clamp-2'>{movie.title}</p>
          </div>
        </a>
      ))}
    </div>
  </div>
)}
        </div>
      
      </div>
      </div>
      
      <Footer/>
    </div>
  );
}

export default page;