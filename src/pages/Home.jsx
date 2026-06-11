import Hero from "../components/Hero";
import About from "../components/About";
import HowItWorks from "../components/HowItWorks";
import Membership from "../components/Membership";
import Services from "../components/Services";
import CTASection from "../components/CTASection";


function Home() {
  return (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <Membership featuredOnly />
      <Services />
      <CTASection />
    </>
  );
}

export default Home;