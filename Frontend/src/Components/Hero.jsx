const Hero = () => {
  return (
    <section className="py-8 flex flex-col-reverse md:items-center md:flex md:flex-row w-full">
      <div className="h-full text-center md:text-end md:pt-10 md:pl-14 lg:pl-32">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          Wherever You Go,
          <br /> We’re Ready
        </h1>
        <h3 className="font-medium text-base mt-4 md:mt-4">
          From airport pickups to weekend getaways,
          <br /> get the perfect car for every journey.
        </h3>
        <div className="flex justify-center mt-4 md:mb-10 lg:mt-10">
          <button className="bg-orange-600 hover:bg-red-700 shadow-lg text-white px-4 py-1 md:py-2 rounded-md">
            Book Ride
          </button>
        </div>
      </div>

      <div className="px-8 md:pl-14 md:py-10 lg:px-16">
        <img
          src="/Car 3.png"
          alt="Background"
          className="md:w-[600px] w-[700px]"
        />
      </div>
    </section>
  );
};

export default Hero;
