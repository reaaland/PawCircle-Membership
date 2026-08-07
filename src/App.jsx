import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DemoBanner from "./components/DemoBanner";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import MembershipPage from "./pages/MembershipPage";
import ServicesPage from "./pages/ServicesPage";
import JoinPage from "./pages/JoinPage";
import FAQPage from "./pages/FAQPage";
import CodeOfConductPage from "./pages/CodeOfConductPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import ContactPage from "./pages/ContactPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ForProvidersPage from "./pages/ForProvidersPage";
import DemoPage from "./pages/DemoPage";
import CaseStudyPage from "./pages/CaseStudyPage";

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <DemoBanner />
      <Navbar />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/for-providers" element={<ForProvidersPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/case-study" element={<CaseStudyPage />} />

          {[
            "/dashboard",
            "/providers",
            "/pet-owners",
            "/messages",
            "/profile",
            "/details",
            "/account",
            "/membership-success",
            "/update-password",
            "/coming-soon",
          ].map((path) => (
            <Route key={path} path={path} element={<Navigate to="/demo" replace />} />
          ))}

          <Route path="/faq" element={<FAQPage />} />
          <Route path="/code" element={<CodeOfConductPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfUsePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
