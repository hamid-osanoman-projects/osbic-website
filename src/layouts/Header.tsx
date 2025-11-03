import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import CostCalculator from "../components/features/CostCalculator";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [businessSetupOpen, setBusinessSetupOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const businessRef = useRef<HTMLDivElement>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [mobileBusinessSetupOpen, setMobileBusinessSetupOpen] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (businessRef.current && !businessRef.current.contains(e.target as Node)) {
        setBusinessSetupOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    const isRtl = lang === "ar" || lang === "fa";
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    setLanguageOpen(false);
  };

  const alignment = document.documentElement.dir === "rtl" ? "text-right" : "text-left";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b border-blue-100">
        <nav className="container mx-auto px-5 py-10 flex justify-between items-center font-sans font-light tracking-wide">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl font-light tracking-wide text-[#42A5E1]">OSBIC</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex flex-1 justify-center items-center gap-8">
            <Link to="/" className={`text-gray-800 text-lg font-light hover:text-[#42A5E1] transition ${alignment}`}>
              {t("nav.home")}
            </Link>
            <Link to="/about" className={`text-gray-800 text-lg font-light hover:text-[#42A5E1] transition ${alignment}`}>
              {t("nav.about")}
            </Link>
            <Link to="/services" className={`text-gray-800 text-lg font-light hover:text-[#42A5E1] transition ${alignment}`}>
              {t("nav.services")}
            </Link>

            {/* Business Setup Dropdown */}
            <div
              ref={businessRef}
              className="relative group"
              onMouseEnter={() => setBusinessSetupOpen(true)}
              onMouseLeave={() => setBusinessSetupOpen(false)}
            >
              <button className={`text-gray-800 text-[17px] font-medium hover:text-[#42A5E1] transition flex items-center gap-1 ${alignment}`}>
                {t("nav.businessSetup")} <ChevronDown size={18} />
              </button>
              <div
                className={`absolute top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 transition-all duration-200
                  ${businessSetupOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}
                `}
                style={{ [document.documentElement.dir === "rtl" ? "right" : "left"]: 0 }}
              >
                <div className="py-2 min-w-[230px]">
                  {[
                    { to: "/business-setup/oman", label: t("businessSetups.oman") },
                    { to: "/business-setup/uae", label: t("businessSetups.uae") },
                    { to: "/business-setup/saudi-arabia", label: t("businessSetups.saudi") },
                    { to: "/business-setup/qatar", label: t("businessSetups.qatar") },
                    { to: "/business-setup/kuwait", label: t("businessSetups.kuwait") },
                    { to: "/business-setup/bahrain", label: t("businessSetups.bahrain") },
                    { to: "/business-setup/iran", label: t("businessSetups.iran") },
                    { to: "/business-setup/india", label: t("businessSetups.india") },
                  ].map(item => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="block px-5 py-2 text-gray-700 text-[16px] font-light hover:bg-blue-50 hover:text-[#42A5E1] transition"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/contact" className={`text-gray-800 text-lg font-light hover:text-[#42A5E1] transition ${alignment}`}>
              {t("nav.contact")}
            </Link>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-lg text-gray-800 font-semibold text-[15px] hover:bg-blue-50 transition"
              >
                <span className="text-[#42A5E1] uppercase">{i18n.language}</span>
                <ChevronDown size={16} />
              </button>
              {languageOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-lg py-2 min-w-[120px] z-50">
                  {["en", "ar", "fa"].map(lang => (
                    <button
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className={`block w-full text-left px-4 py-2 text-[15px] ${
                        i18n.language === lang ? "bg-blue-50 text-[#42A5E1] font-semibold" : "hover:bg-blue-50 hover:text-[#42A5E1]"
                      }`}
                    >
                      {lang === "en" ? "English" : lang === "ar" ? "العربية" : "فارسی"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Get Quote */}
            <div className="hidden lg:block">
              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="bg-[#42A5E1] hover:bg-[#1e88e5] text-white px-6 py-2.5 rounded-lg font-semibold text-[15px] shadow-md transition"
              >
                {t("nav.GetInstantQuote")}
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden">
              <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-700 focus:outline-none">
                {mobileOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="bg-white shadow-md border-t border-gray-100 md:w-3/4 md:mx-auto md:rounded-lg md:mt-2">
            <div className="flex flex-col items-start px-6 py-4 space-y-3 text-[17px]">
              <Link to="/" onClick={() => setMobileOpen(false)} className="hover:text-[#42A5E1]">
                {t("nav.home")}
              </Link>
              <Link to="/about" onClick={() => setMobileOpen(false)} className="hover:text-[#42A5E1]">
                {t("nav.about")}
              </Link>
              <Link to="/services" onClick={() => setMobileOpen(false)} className="hover:text-[#42A5E1]">
                {t("nav.services")}
              </Link>

              {/* Mobile Business Setup */}
              <div className="w-full">
                <button
                  onClick={() => setMobileBusinessSetupOpen(!mobileBusinessSetupOpen)}
                  className="flex justify-between w-full items-center text-gray-800 hover:text-[#42A5E1]"
                >
                  {t("nav.businessSetup")}
                  <ChevronDown className={`transition-transform ${mobileBusinessSetupOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileBusinessSetupOpen && (
                  <div className="mt-2 pl-3 border-l border-gray-200 space-y-2">
                    {[
                      { to: "/business-setup/oman", label: t("businessSetup.oman") },
                      { to: "/business-setup/uae", label: t("businessSetup.uae") },
                      { to: "/business-setup/saudi-arabia", label: t("businessSetup.saudi") },
                      { to: "/business-setup/qatar", label: t("businessSetup.qatar") },
                      { to: "/business-setup/kuwait", label: t("businessSetup.kuwait") },
                      { to: "/business-setup/bahrain", label: t("businessSetup.bahrain") },
                      { to: "/business-setup/iran", label: t("businessSetup.iran") },
                      { to: "/business-setup/india", label: t("businessSetup.india") },
                    ].map(item => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block py-1 text-gray-600 hover:text-[#42A5E1]"
                        onClick={() => {
                          setMobileBusinessSetupOpen(false);
                          setMobileOpen(false);
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/contact" onClick={() => setMobileOpen(false)} className="hover:text-[#42A5E1]">
                {t("nav.contact")}
              </Link>

              <button
                onClick={() => {
                  setIsCalculatorOpen(true);
                  setMobileOpen(false);
                }}
                className="bg-[#42A5E1] text-white px-5 py-2 mt-3 rounded-lg w-full text-center font-semibold"
              >
                {t("nav.GetInstantQuote")}
              </button>
            </div>
          </div>
        )}
      </header>

      {isCalculatorOpen && <CostCalculator open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen} />}
    </>
  );
}
