import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import MembershipPage from "./pages/MembershipPage";
import ServicesPage from "./pages/ServicesPage";
import JoinPage from "./pages/JoinPage";
import Dashboard from "./components/Dashboard";
import ProvidersPage from "./pages/ProvidersPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
<Router>
  <Navbar />

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/membership" element={<MembershipPage />} />
    <Route path="/services" element={<ServicesPage />} />
    <Route path="/join" element={<JoinPage />} />
    <Route path="/join" element={<JoinPage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/providers" element={<ProvidersPage />} />
  </Routes>

  <Footer />
</Router>
  );
}

export default App;