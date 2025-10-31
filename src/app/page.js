"use client";
import DistrictSelector from "./components/layouts/DistrictSelector";
import Hero from "./components/layouts/Hero";


export default function Home() {
  return (
    <>
      <div>
        <Hero />
        <DistrictSelector />
      </div>
    </>
  );
}
