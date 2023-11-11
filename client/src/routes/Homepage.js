import About from "../components/About";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Slider from "../components/Slider";

function Homepage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Slider />
      <About />
      {/* <Services /> */}
      <Footer />
    </>
  );
}

export default Homepage;
