import React from "react";

const Hero = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row min-h-screen overflow-hidden bg-[#eceebe]">
      <div className="left w-full p-6 flex flex-col justify-center md:w-3/5 md:pl-14 lg:pl-32">
        <h1 className="text-3xl md:text-3xl lg:text-5xl font-bold text-center md:text-left">
          Wherever You Go, We are Ready
        </h1>
        <h3 className="text-base md:text-base lg:text-lg mt-4 text-center md:text-left">
          From airport pickups to weekend getaways, get the perfect car for
          every journey.
        </h3>
        <div className="flex justify-center md:justify-start mt-4 md:mb-10">
          <button className="bg-[#ff4d30] hover:bg-[#f01a1a] shadow-lg text-white px-4 py-2 rounded-md">
            Book Ride
          </button>
        </div>
      </div>
      <div className="right relative w-full flex justify-center md:items-center ">
        <img
          className="md:w-[400px] lg:w-[700px] z-20"
          src="/Range Rover.png"
          alt="Range Rover"
        />
        <div className="bg-yellow-300 absolute z-10 md:h-[500px] md:w-[500px] rounded-full right-10"></div>
      </div>
    </section>
  );
};

export default Hero;
