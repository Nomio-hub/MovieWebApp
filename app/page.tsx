"use client"
import { Comp1 } from "@/app/components/Comp1";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { MovieCard } from "@/app/components/MovieCard";
import { When } from "@/app/components/When";
import { useEffect, useState } from "react";
import { MovieSummary } from "./types";
import axios from "axios";

const API_KEY = "d67d8bebd0f4ff345f6505c99e9d0289";
const BASE_URL = "https://api.themoviedb.org/3";

export default function Home() {
   
  const [upcoming, setUpcoming] = useState<MovieSummary[]>([]); 
  const [popular, setPopular] = useState<MovieSummary[]>([]);
  const [topRated, setTopRated] = useState<MovieSummary[]>([]);
  

 useEffect(() => {
    const fetchAll = async () => {
      const [upcomingRes, popularRes, topRatedRes] = await Promise.all([
        axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`),
        axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`),
        axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`),
      
      ]);
      setUpcoming(upcomingRes.data.results);
      setPopular(popularRes.data.results);
      setTopRated(topRatedRes.data.results);
     
    };

    fetchAll();
  }, []);
  const sections = [
    { label: "Upcoming", data: upcoming },
    { label: "Popular", data: popular },
    { label: "Top Rated", data: topRated },
   
  ];

  return (
    <div className="space-y-3 text-black">
      <Header />
      <Comp1 />
      <div className="container">
        {sections.map(({ label, data }) => (
          <div key={label}>
            <When when={label} />
            <div className="grid grid-cols-5 gap-8">
              {data.slice(0, 10).map((movie) => (
                <MovieCard upcoming={movie} key={movie.id} />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <Footer />
    </div>
  );
}
