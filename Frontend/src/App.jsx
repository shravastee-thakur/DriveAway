import "remixicon/fonts/remixicon.css";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Facilities from "./Components/Facilities";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <div className="h-full w-full">
      <Navbar />
      <Hero />
      <Facilities />
      <Footer />
    </div>
  );
};

export default App;
