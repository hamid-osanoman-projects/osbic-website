import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, Globe, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [businessSetupOpen, setBusinessSetupOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const businessRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (businessRef.current && !businessRef.current.contains(e.target as Node)) {
        setBusinessSetupOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' || lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    setLanguageOpen(false);
  };

  const toggleBusinessSetup = () => {
    setBusinessSetupOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm">
      {/* 🔹 Topbar */}
      <div className="bg-[#42A5E1] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a
              href="tel:+96872596531"
              className="flex items-center gap-2 hover:text-[#e0f3ff] transition"
            >
              <Phone size={14} />
              <span>+968 72596531</span>
            </a>
            <a
              href="mailto:info@osbic.net"
              className="flex items-center gap-2 hover:text-[#e0f3ff] transition"
            >
              <Mail size={14} />
              <span>info@osbic.net</span>
            </a>
          </div>

          {/* 🌍 Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center gap-2 hover:text-[#e0f3ff] transition"
            >
              <Globe size={14} />
              <span>
                {i18n.language === 'en'
                  ? 'English'
                  : i18n.language === 'ar'
                  ? 'العربية'
                  : 'فارسی'}
              </span>
              <ChevronDown size={14} />
            </button>

            {languageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl py-2 min-w-[120px] z-50">
                {['en', 'ar', 'fa'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className="block w-full text-left px-4 py-2 hover:bg-[#e6f4fb] hover:text-[#42A5E1] transition"
                  >
                    {lang === 'en'
                      ? 'English'
                      : lang === 'ar'
                      ? 'العربية'
                      : 'فارسی'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 🔹 Navbar */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/OSBIC-FAVICON-100x100.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-bold text-[#42A5E1]">OSBIC</span>
          </Link>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-[#42A5E1] transition">
              {t('nav.home')}
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-[#42A5E1] transition">
              {t('nav.about')}
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-[#42A5E1] transition">
              {t('nav.services')}
            </Link>

            {/* Business Setup Dropdown */}
            <div
              ref={businessRef}
              className="relative"
              onMouseEnter={() => setBusinessSetupOpen(true)}
              onMouseLeave={() => setBusinessSetupOpen(false)}
            >
              <button
                onClick={toggleBusinessSetup}
                className="text-gray-700 hover:text-[#42A5E1] transition flex items-center gap-1"
              >
                {t('nav.businessSetup')}
                <ChevronDown size={16} />
              </button>

              {businessSetupOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl py-2 min-w-[200px] z-50">
                  {[
                    { to: '/business-setup/oman', label: t('businessSetup.oman') },
                    { to: '/business-setup/uae', label: t('businessSetup.uae') },
                    { to: '/business-setup/saudi-arabia', label: t('businessSetup.saudi') },
                    { to: '/business-setup/qatar', label: t('businessSetup.qatar') },
                    { to: '/business-setup/kuwait', label: t('businessSetup.kuwait') },
                    { to: '/business-setup/bahrain', label: t('businessSetup.bahrain') },
                    { to: '/business-setup/iran', label: t('businessSetup.iran') },
                    { to: '/business-setup/india', label: t('businessSetup.india') },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block px-4 py-2 text-gray-700 hover:bg-[#e6f4fb] hover:text-[#42A5E1] transition"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/testimonials" className="text-gray-700 hover:text-[#42A5E1] transition">
              {t('nav.testimonials')}
            </Link>
            <Link to="/resources" className="text-gray-700 hover:text-[#42A5E1] transition">
              {t('nav.resources')}
            </Link>

            <Link
              to="/contact"
              className="bg-[#42A5E1] text-white px-6 py-2 rounded-lg hover:bg-[#1E88E5] transition"
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
