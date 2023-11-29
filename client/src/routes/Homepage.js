import { useNavigate } from "react-router-dom";
import About from "../components/About";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Slider from "../components/Slider";
import { useEffect } from "react";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Faq";
import ContactUs from "../components/ContactUs";
import Intro from "../components/Intro";
import "./Homepage.css";
import Gallery from "../components/Gallery";

function Homepage() {
  const navigate = useNavigate();
  const UserValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/validUser`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    });
    const data = await res.json();
    if (data.status === 401 || !data) {
      navigate("/");
    } else {
      navigate("/mainpage/afterlogin");
    }
  };
  useEffect(() => {
    UserValid();
  }, []);
  return (
    <>
      <Navbar />
      <Hero />
      {/* <Slider /> */}
      <About />
      <Gallery />
      <Services />
      <Testimonials />
      <ContactUs />
      <Faq />
      <Intro />
      <Footer />
    </>
  );
}

export default Homepage;
