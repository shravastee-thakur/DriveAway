import React from "react";
import Hero from "../Components/Hero";
import Facilities from "../Components/Facilities";
import Footer from "../Components/Footer";
import Book from "../Components/Book";
import Fleet from "../Components/Fleet";

const Home = () => {
  return (
    <div>
      <Hero />
      <Book />
      <Facilities />
      <Fleet />
      <Footer />
    </div>
  );
};

export default Home;
