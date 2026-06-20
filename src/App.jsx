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
import PetOwnersPage from "./pages/PetOwnersPage.jsx";
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
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ComingSoonPage from "./pages/ComingSoonPage";
import MembershipSuccess from "./pages/MembershipSuccess";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";


function AppLayout() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  async function checkSession() {
    const { data } = await supabase.auth.getSession();
    setIsLoggedIn(!!data.session);
  }

  checkSession();

  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setIsLoggedIn(!!session);
    }
  );

  return () => {
    listener.subscription.unsubscribe();
  };
}, []);

  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const launchDate = new Date("June 27, 2026 09:00:00").getTime();
  const isBeforeLaunch = Date.now() < launchDate;

  const isComingSoon = location.pathname === "/coming-soon";

  // Show Coming Soon page on Vercel before launch
  if (isBeforeLaunch && !isLocalhost) {
    return <ComingSoonPage />;
  }

  return (
    <>
      <ScrollToTop />

      {!isComingSoon && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/join" element={<JoinPage />} />

        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/join" />} />
        <Route path="/providers" element={isLoggedIn ? <ProviderPage /> : <Navigate to="/join" />} />
        <Route path="/pet-owners" element={isLoggedIn ? <PetOwnersPage /> : <Navigate to="/join" />} />
        <Route path="/messages" element={isLoggedIn ? <Messages /> : <Navigate to="/join" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/join" />} />
        <Route path="/details" element={isLoggedIn ? <MembershipDetails /> : <Navigate to="/join" />} />
        <Route path="/account" element={isLoggedIn ? <AccountSettings /> : <Navigate to="/join" />} />

        <Route path="/faq" element={<FAQPage />} />
        <Route path="/code" element={<CodeOfConductPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfUsePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/coming-soon" element={<ComingSoonPage />} />
        <Route path="/membership-success" element={<MembershipSuccess />} />
      </Routes>

      {!isComingSoon && <Footer />}
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