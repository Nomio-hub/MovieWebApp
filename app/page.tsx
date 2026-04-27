"use client"
import { Comp1 } from "@/app/components/Comp1";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { MovieCard } from "@/app/components/MovieCard";
import { When } from "@/app/components/When";
import { useEffect, useState } from "react";
import { MovieSummary } from "./types";
import axios from "axios";
import Swiper from "swiper";


export default function Home() {
  const [upcoming, setUpcoming] = useState<MovieSummary[]>([]); 
  const [popular, setPopular] = useState<MovieSummary[]>([]);
  const [topRated, setTopRated] = useState<MovieSummary[]>([]);
  const [trending, setTrending] = useState<MovieSummary[]>([]);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=d67d8bebd0f4ff345f6505c99e9d0289`).then((res) => {
      setUpcoming(res.data.results);
    });
  }, []);
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=d67d8bebd0f4ff345f6505c99e9d0289`).then((res) => {
      setPopular(res.data.results);
    });
  }, []);
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=d67d8bebd0f4ff345f6505c99e9d0289`).then((res) => {
      setTopRated(res.data.results);
    });
  }, []);
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=d67d8bebd0f4ff345f6505c99e9d0289`).then((res) => {
      setTrending(res.data.results);
    });
  }, []);

 


  return (
    <div className="">
     <div className="space-y-3 text-black">
       <div className="">
        <Header/>
       </div>
       <div>
        
        <Comp1/>
       </div>
      
       <div className="px-20">
        <>
        <When
        when="Upcoming"/>
         <div className="grid grid-cols-5 gap-8">
        {upcoming.slice(0, 10).map((upcome) => (
          <MovieCard upcoming={upcome} key={upcome.id}
          />
        ))}
         </div>
        </>

        <>
        <When
        when="Popular"/>
         <div className="grid grid-cols-5 gap-8">
        {popular.slice(0, 10).map((upcome) => (
          <MovieCard upcoming={upcome} key={upcome.id}
          />
        ))}
         </div>
         </>

        <>   
         <When
        when="Top rated"/>
         <div className="grid grid-cols-5 gap-8">
        {topRated.slice(0, 10).map((upcome) => (
          <MovieCard upcoming={upcome} key={upcome.id}
          />
        ))}
         </div>
        </>
       </div>
      <Footer/>
      </div>
    </div>
  );
}
