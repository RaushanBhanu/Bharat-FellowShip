import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative w-full h-96 lg:h-[500px] overflow-hidden mt-18">
      <Image
        src="/images/farmers.png"
        alt="Farmers working in the field"
        fill
        className="absolute inset-0 bg-cover bg-center"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70" />
      <div className="relative h-full container mx-auto px-4 md:px-8 flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Our Voice, Our Rights
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl text-white/95 max-w-2xl drop-shadow-md">
          Know how your district is performing in MGNREGA
        </p>
      </div>
    </section>
  );
};

export default Hero;
