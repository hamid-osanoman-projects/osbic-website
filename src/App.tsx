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
    document.body.style.fontFamily = i18n.language === 'ar' || i18n.language === 'fa' ? "'Tajawal', sans-serif" : "'Inter', sans-serif";
  }, [i18n.language]);

  // Check if user has seen intro before
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <Toaster position="top-right" />
      <Router>
        <ScrollToTop />

        {/* --- FIX 1: Render Animation ON TOP (Z-Index 50) --- */}
        {showIntro && (
           // We wrap it in a div with high z-index so it covers the content
           <div className="fixed inset-0 z-50 pointer-events-none"> 
              <div className="pointer-events-auto w-full h-full">
                 <IntroAnimation onComplete={handleIntroComplete} />
              </div>
           </div>
        )}

        {/* --- FIX 2: ALWAYS render the website content underneath --- */}
        {/* I removed the conditional {introComplete && (...)} wrapper here. */}
        <div
          className="min-h-screen bg-white"
          dir={i18n.dir()}
        >
          <Header />
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home1 />} />
            <Route path="/en" element={<Home1 />} />
            <Route path="/ar" element={<Home1 />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
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
      </Router>
    </I18nextProvider>
  );
}

export default App;