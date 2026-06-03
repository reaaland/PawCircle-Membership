import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Membership from "./components/Membership";
import Join from "./components/Join";
import Services from "./components/Services";
import Providers from "./components/Providers";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Membership />
      <Join />
      <Services />
      <Providers />
      <Footer />
    </>
  );
}

export default App;