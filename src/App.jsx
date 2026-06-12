import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import MembershipPage from "./pages/MembershipPage";
import ServicesPage from "./pages/ServicesPage";
import JoinPage from "./pages/JoinPage";
import Dashboard from "./components/Dashboard";
import ProviderPage from "./pages/ProviderPage";
import FAQPage from "./pages/FAQPage";
import CodeOfConductPage from "./pages/CodeOfConductPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import ContactPage from "./pages/ContactPage";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import MembershipDetails from "./components/MembershipDetails";
import AccountSettings from "./components/AccountSettings";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ComingSoonPage from "./pages/ComingSoonPage";

function AppLayout() {
const location = useLocation();
const launchDate = new Date("June 27, 2026 09:00:00").getTime();
const isBeforeLaunch = new Date().getTime() < launchDate;
const isComingSoon = location.pathname === "/coming-soon";
const hideLayout = isBeforeLaunch || isComingSoon;

  return (
    <>
      <ScrollToTop />

      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={isBeforeLaunch ? <ComingSoonPage /> : <Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/providers" element={<ProviderPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/code" element={<CodeOfConductPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfUsePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/details" element={<MembershipDetails />} />
        <Route path="/account" element={<AccountSettings />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
      </Routes>

      {!hideLayout && <Footer />}
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