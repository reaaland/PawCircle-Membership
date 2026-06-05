import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import MembershipPage from "./pages/MembershipPage";
import ServicesPage from "./pages/ServicesPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
<Router>
  <Navbar />

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/membership" element={<MembershipPage />} />
  </Routes>

  <Footer />
</Router>
  );
}

export default App;