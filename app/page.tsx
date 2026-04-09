import { Comp1 } from "@/components/Comp1";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MovieCard } from "@/components/MovieCard";
import { When } from "@/components/When";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-3 text-black">
      <div className="">
        <Header/>
      </div>
      <div>
        <Comp1/>
      </div>
      
      <div className="px-20">
        <When/>
        <MovieCard/>
      </div>
      <Footer/>
    </div>
  );
}
