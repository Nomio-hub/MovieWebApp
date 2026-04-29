"use client"
import { Comp1 } from "@/app/components/Comp1";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { Parts } from "./components/Parts";

export default function Home() {
   
  return (
    <div className="space-y-3 text-black">
      <Header />
      <Comp1 />
      <Parts/>
      <Footer />
    </div>
  );
}
