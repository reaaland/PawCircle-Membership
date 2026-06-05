import Hero from "../components/Hero";
import About from "../components/About";
import Membership from "../components/Membership";
import Services from "../components/Services";
import Providers from "../components/Providers";
import JoinButton from "../components/JoinButton";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Membership featuredOnly />
      <CTASection />
      <Providers />
    </>
  );
}

export default Home;