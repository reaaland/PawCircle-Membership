import Hero from "../components/Hero";
import About from "../components/About";
import Membership from "../components/Membership";
import Providers from "../components/Providers";
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