'use client'
import React, { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { useParams } from 'next/navigation';
import { MovieDetail } from '../../types';
import { When } from '@/app/components/When';



const page = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);

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
      <div className='contain'>
        <div className='px-45 flex flex-col gap-2'>
        <div className='space-y-8'>
          <div className='flex justify-between'>
            <div>
              <p className='font-bold text-4xl'>{movie.title}</p>
              <p>2024</p>
            </div>
            <div>
              <p>Rating</p>
               <div className='flex'>
                <img src="/star.svg" alt="" />
               <div>
                <p>6.9<span>/10</span>
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
            <div className='flex pt-[364px] gap-3 w-43.5 h-10 relative items-center justify-center'>
              <button className='rounded-full bg-white h-10 w-10'><img className=' px-4 py-2' src="/play.svg" alt="" /></button>
              <p className='text-base text-white'>Play trailer</p>
              <p className='text-sm text-white'>2:35</p>
            </div>
            </div>
            
          </div>
        </div>
        <div>
          <div>
            <div className='border border-[#E4E4E7] rounded-full text-xs px-[10px] py-[2px]'>Fairy tail</div>
          </div>
          <div>
            <p>Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads. </p>
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
          <When when={'More like this'}/>
        </div>
      
      </div>
      </div>
      
      <Footer/>
    </div>
  );
}

export default page;