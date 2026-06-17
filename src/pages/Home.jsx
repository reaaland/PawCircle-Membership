import Hero from "../components/Hero";
import About from "../components/About";
import HowItWorks from "../components/HowItWorks";
import Membership from "../components/Membership";
import Services from "../components/Services";
import CTASection from "../components/CTASection";
import ProviderPreview from "../components/ProviderPreview";
import Footer from "../components/Footer";


function Home() {
  return (
    <>
      <Hero />
      <About />
      <HowItWorks />
      <Services />
      <ProviderPreview />
      <Membership featuredOnly />
      <CTASection />
    </>
  );
  <Footer/>
}

export default Home;