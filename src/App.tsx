import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n, { setLanguageDirection } from './i18n/config';
import IntroAnimation from './components/IntroAnimation';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { Toaster } from "react-hot-toast";

import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound';

// Pages
import Home1 from './pages/Home1';
import About from './pages/About';
import Services from './pages/Services';
// import BusinessLocations from './pages/BusinessLocations';
// import CaseStudies from './pages/CaseStudies';
// import Testimonials from './pages/Testimonials';
// import Resources from './pages/Resources';
import Contact from './pages/Contact';
import OmanBusinessSetup from './pages/business-setup/Oman';
import IranBusinessSetup from './pages/business-setup/Iran';
import UAEBusinessSetup from './pages/business-setup/UAE';
import SaudiArabiaBusinessSetup from './pages/business-setup/SaudiArabia';
import QatarBusinessSetup from './pages/business-setup/Qatar';
import KuwaitBusinessSetup from './pages/business-setup/Kuwait';
import BahrainBusinessSetup from './pages/business-setup/Bahrain';
import IndiaBusinessSetup from './pages/business-setup/India';
import ServiceDetail from './pages/ServiceDetail';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);
  const { i18n } = useTranslation();

  // Load preferred language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'en';
    i18n.changeLanguage(savedLang);
    setLanguageDirection(savedLang);
  }, []);

  // Update dir/lang whenever language changes
  useEffect(() => {
    setLanguageDirection(i18n.language);
    // Change font dynamically
    document.body.style.fontFamily = i18n.language === 'ar' || i18n.language === 'fa' ? "'Tajawal', sans-serif" : "'Inter', sans-serif";
  }, [i18n.language]);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
      setIntroComplete(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
    setTimeout(() => setIntroComplete(true), 100);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <Toaster position="top-right" />
      <Router>
        <ScrollToTop />
        {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
        {introComplete && (
          <div className="min-h-screen bg-white">
            <Header />
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Home1 />} />
              <Route path="/en" element={<Home1 />} />
              <Route path="/ar" element={<Home1 />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              {/* <Route path="/business-locations" element={<BusinessLocations />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/resources" element={<Resources />} /> */}
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/business-setup/oman" element={<OmanBusinessSetup />} />
              <Route path="/business-setup/iran" element={<IranBusinessSetup />} />
              <Route path="/business-setup/uae" element={<UAEBusinessSetup />} />
              <Route path="/business-setup/saudi-arabia" element={<SaudiArabiaBusinessSetup />} />
              <Route path="/business-setup/qatar" element={<QatarBusinessSetup />} />
              <Route path="/business-setup/kuwait" element={<KuwaitBusinessSetup />} />
              <Route path="/business-setup/bahrain" element={<BahrainBusinessSetup />} />
              <Route path="/business-setup/india" element={<IndiaBusinessSetup />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
          </div>
        )}
      </Router>
    </I18nextProvider>
  );
}

export default App;
