import React from "react";

const Hero = () => {
  return (
    <section className="flex w-full h-screen mt-20">
      <div className="pt-28 h-full text-end pl-32">
        <h1 className="text-5xl font-bold">
          Wherever You Go,
          <br /> We’re Ready
        </h1>
        <h3 className="font-medium text-lg mt-4">
          From airport pickups to weekend getaways,
          <br /> get the perfect car for every journey.
        </h3>
        <div className="flex justify-center mt-2 md:mb-10">
          <button className="bg-orange-600 hover:bg-red-700 shadow-lg text-white px-4 py-2 rounded-md">
            Book Ride
          </button>
        </div>
      </div>

      <div className="px-20">
        <img src="/Car 3.png" alt="Background" className="w-[700px]" />
      </div>
    </section>
  );
};

export default Hero;
