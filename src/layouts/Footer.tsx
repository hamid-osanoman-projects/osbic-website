import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-br from-[#42A5E1] to-[#1e88e5] text-white pt-16 pb-8 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo & Tagline */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-light tracking-wide text-white">OSBIC</span>
            </div>
            <p className="text-blue-100 text-sm mb-4">{t('footer.tagline')}</p>

            {/* Social Icons - Desktop & Tablet */}
            <div className="hidden md:flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white transition"
                >
                  <Icon size={16} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
          <h3 className="text-lg font-semibold mb-4">{t("footer.quickLinks.title")}</h3>
<ul className="space-y-2 text-sm">
  <li><Link to="/about" className="text-blue-100 hover:text-white transition">{t("footer.quickLinks.about")}</Link></li>
  <li><Link to="/case-studies" className="text-blue-100 hover:text-white transition">{t("footer.quickLinks.caseStudies")}</Link></li>
  <li><Link to="/testimonials" className="text-blue-100 hover:text-white transition">{t("footer.quickLinks.testimonials")}</Link></li>
  <li><Link to="/careers" className="text-blue-100 hover:text-white transition">{t("footer.quickLinks.careers")}</Link></li>
</ul>
          </div>

          {/* Services - only Desktop */}
          <div className="hidden lg:block">
          <h3 className="text-lg font-semibold mb-4">{t("footer.services.title")}</h3>
<ul className="space-y-2 text-sm">
  <li><Link to="/services/company-registration">{t("footer.services.companyRegistration")}</Link></li>
  <li><Link to="/services/visa-emigration">{t("footer.services.visaEmigration")}</Link></li>
  <li><Link to="/services/rop-services">{t("footer.services.ropServices")}</Link></li>
  <li><Link to="/services/pro-services">{t("footer.services.proServices")}</Link></li>
</ul>

          </div>

          {/* Contact Info */}
 <div>
  <h3 className="text-lg font-semibold mb-4">{t("footer.contactInfo.title")}</h3>
  <ul className="space-y-3 text-sm">
    <li className="flex items-start gap-2 text-blue-100">
      <MapPin size={16} className="mt-1 flex-shrink-0" />
      <span>{t("footer.contactInfo.address")}</span>
    </li>
    <li className="flex items-center gap-2 text-blue-100">
      <Phone size={16} />
      <a href={`tel:${t("footer.contactInfo.phone")}`} className="hover:text-white transition">
        {t("footer.contactInfo.phone")}
      </a>
    </li>
    <li className="flex items-center gap-2 text-blue-100">
      <Mail size={16} />
      <a href={`mailto:${t("footer.contactInfo.email")}`} className="hover:text-white transition">
        {t("footer.contactInfo.email")}
      </a>
    </li>
  </ul>
 </div>
</div>

       {/* Footer Bottom */}
<div className="border-t border-white/20 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-blue-100">

{/* Mobile Social Icons */}
<div className="flex gap-3 mb-2 md:hidden justify-center">
  {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
    <a
      key={idx}
      href="#"
      className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white transition"
    >
      <Icon size={16} className="text-white" />
    </a>
  ))}
</div>

<p>{t("footer.copyright")}</p>

{/* Legal Links */}
<div className="flex gap-4 mt-2 md:mt-0 hidden md:flex">
  <Link to="/legal/privacy" className="hover:text-white transition">
    {t("footer.legal.privacy")}
  </Link>
  <Link to="/legal/terms" className="hover:text-white transition">
    {t("footer.legal.terms")}
  </Link>
  <Link to="/legal/cookies" className="hover:text-white transition">
    {t("footer.legal.cookies")}
  </Link>
</div>
</div>
</div>

    </footer>
  );
}
