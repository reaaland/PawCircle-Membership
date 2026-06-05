import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
<Router>
  <Navbar />

  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<AboutPage />} />
  </Routes>

  <Footer />
</Router>
  );
}

export default App;