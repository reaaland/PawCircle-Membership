import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Membership from "./components/Membership";
import Join from "./components/Join";
import Services from "./components/Services";
import Providers from "./components/Providers";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";

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