import Hero from "../components/Hero";
import About from "../components/About";
import Membership from "../components/Membership";
import Services from "../components/Services";
import CTASection from "../components/CTASection";

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Membership featuredOnly />
      <Services />
      <CTASection />
    </>
  );
}

export default Home;