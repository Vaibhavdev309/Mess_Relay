import { useNavigate } from "react-router-dom";
import About from "../components/About";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Slider from "../components/Slider";
import { useEffect } from "react";

function Homepage() {
  const navigate = useNavigate();
  const UserValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    const res = await fetch("/validUser", {
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
      <Slider />
      <About />
      {/* <Services /> */}
      <Footer />
    </>
  );
}

export default Homepage;
