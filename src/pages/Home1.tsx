import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FileCheck, Rocket, CheckCircle, MessageSquare } from "lucide-react";
import { Building2, FileText, Users, Globe } from 'lucide-react';
import ContinuousScrollingLogos from '../components/ContinuousScrollingLogos';
import Chatbot from '../components/Chatbot';
import { useTranslation, Trans } from 'react-i18next';
import "../ServicesFlip.css"

export default function Home1() {
  const { t } = useTranslation();
  const statsRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const steps = [
    {
      icon: <MessageSquare size={32} />,
      title: t("home.process.consultation.title"),
      desc: t("home.process.consultation.desc"),
    },
    {
      icon: <FileCheck size={32} />,
      title: t("home.process.apply.title"),
      desc: t("home.process.apply.desc"),
    },
    {
      icon: <Rocket size={32} />,
      title: t("home.process.setup.title"),
      desc: t("home.process.setup.desc"),
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          animateStats();
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-target') || '0', 10);
      const obj = { count: 0 };
      gsap.to(obj, {
        count: target,
        duration: 2,
        ease: "power1.out",
        onUpdate: () => {
          stat.textContent = Math.floor(obj.count).toLocaleString();
        },
      });
    });
  };

  const services = [
    {
      icon: Building2,
      title: t("service.companyRegistration.title"),
      description: t("services.companyRegistration.desc"),
      img: '/images/service1.jpeg',
      link: '/services/company-registration'
    },
    {
      icon: FileText,
      title: t("service.visaEmigration.title"),
      description: t("services.visaEmigration.desc"),
      img: '/images/service2.jpeg',
      link: '/services/visa-emigration'
    },
    {
      icon: Users,
      title: t("service.proServices.title"),
      description: t("services.proServices.desc"),
      img: '/images/service3.jpeg',
      link: '/services/pro-services'
    },
    {
      icon: Globe,
      title: t("service.ministryServices.title"),
      description: t("services.ministryServices.desc"),
      img: '/images/service4.jpeg',
      link: '/services/ministry-services'
    }
  ];

  const gccCountries = [
    { name: t("countries.oman"), img: "/images/oman.jpeg", link: "/business-setup/oman" },
    { name: t("countries.saudi"), img: "/images/saudi.jpeg", link: "/business-setup/saudi-arabia" },
    { name: t("countries.qatar"), img: "/images/qatar.jpeg", link: "/business-setup/qatar" },
    { name: t("countries.uae"), img: "/images/uae.jpeg", link: "/business-setup/uae" },
    { name: t("countries.kuwait"), img: "/images/kuwait.jpg", link: "/business-setup/kuwait" },
    { name: t("countries.bahrain"), img: "/images/bahrain.jpg", link: "/business-setup/bahrain" },
    { name: t("countries.iran"), img: "/images/iran.jpg", link: "/business-setup/iran" },
    { name: t("countries.india"), img: "/images/india.jpg", link: "/business-setup/india" },
  ];

  const whyChooseOSBIC = [
    t("home.whyChoose.expertTeam"),
    t("home.whyChoose.fastTurnaround"),
    t("home.whyChoose.transparentPricing"),
    t("home.whyChoose.dedicatedManager"),
    t("home.whyChoose.multiLingualSupport"),
    t("home.whyChoose.comprehensivePortfolio"),
  ];

  const counterStats = [
    { target: 11, label: t("home.stats.yearsExperience"), suffix: "+" },
    { target: 100, label: t("home.stats.services"), suffix: "+" },
    { target: 3000, label: t("home.stats.clients"), suffix: "+" },
  ];



  return (
    <div>
      {/* === HERO SECTION === */}
      <section
        className="relative min-h-screen flex flex-col text-white overflow-hidden"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#0a192f]/70"></div>
        <div className="relative z-10 flex flex-col flex-1 justify-center px-6 container mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-left mt-28 md:mt-32 lg:mt-28 text-center md:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t("home.hero.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4 mb-10">
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-[#42A5E1] hover:bg-[#1e81c6] text-white px-8 py-4 rounded-lg font-medium transition text-center text-base sm:text-lg"
              >
                {t("home.hero.ctaBook")}
              </Link>
              <Link
                to="/services"
                className="w-full sm:w-auto border border-white/40 text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition text-center text-base sm:text-lg"
              >
                {t("home.hero.ctaServices")}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ===== COUNTER SECTION ===== */}
        <div ref={statsRef} className="bg-white py-4 sm:py-6 relative z-10">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center max-w-5xl mx-auto text-gray-800">
            {counterStats.map((s, i) => (
              <div key={i}>
                <div className="text-xl sm:text-3xl font-semibold mb-1 text-[#42A5E1]">
                  <span className="stat-number" data-target={s.target}>0</span>{s.suffix}
                </div>
                <div className="text-gray-600 text-xs sm:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== WHATSAPP FLOAT BUTTON ===== */}
<a
  href="https://api.whatsapp.com/send?phone=96872596531&text=Hello!%20I'm%20interested%20in%20your%20business%20setup%20and%20visa%20services.%20Could%20you%20please%20assist%20me%3F"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat on WhatsApp"
  className="fixed bottom-5 right-5 bg-[#25D366] hover:bg-[#1DA851] text-white p-4 rounded-full shadow-lg z-50 transition animate-bounce"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="w-7 h-7 fill-white"
  >
    <path d="M16.027 3C9.4 3 4 8.4 4 15.027c0 2.65.877 5.102 2.358 7.073L4 29l7.066-2.307a12.9 12.9 0 0 0 4.96.985c6.627 0 12.027-5.4 12.027-12.027C28.053 8.4 22.653 3 16.027 3zm0 21.734c-1.676 0-3.31-.44-4.76-1.275l-.34-.2-4.195 1.37 1.378-4.09-.222-.352a9.33 9.33 0 0 1-1.437-4.99c0-5.176 4.2-9.377 9.376-9.377 5.177 0 9.377 4.2 9.377 9.377 0 5.177-4.2 9.377-9.377 9.377zm5.09-7.032c-.278-.14-1.647-.813-1.9-.906-.256-.093-.444-.14-.63.14-.187.28-.72.906-.882 1.09-.163.186-.324.21-.602.07-.278-.14-1.176-.434-2.24-1.384-.828-.738-1.387-1.65-1.55-1.93-.163-.28-.018-.43.122-.57.126-.126.28-.324.42-.486.14-.163.187-.28.28-.466.093-.187.047-.35-.023-.49-.07-.14-.63-1.522-.863-2.086-.226-.542-.456-.47-.63-.48-.163-.007-.35-.01-.538-.01-.187 0-.49.07-.747.35-.256.28-.98.958-.98 2.33 0 1.373 1.003 2.7 1.146 2.884.14.187 1.97 3.01 4.82 4.22.674.29 1.2.464 1.61.595.677.215 1.294.185 1.784.112.544-.08 1.647-.672 1.88-1.32.233-.65.233-1.207.163-1.326-.07-.12-.256-.187-.533-.327z" />
  </svg>
</a>


        {/* ===== CHATBOT (fixed left bottom) ===== */}
        <div className="fixed bottom-5 left-5 z-50">
          <Chatbot />
        </div>
      </section>

      {/* === SERVICES === */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-light mb-4">{t("home.services.title")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-16">{t("home.services.subtitle")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {services.map((s, i) => (
              <Link key={i} to={s.link} className="flip-card cursor-pointer">
                <div className="flip-card-inner">
                  <div className="flip-card-front overflow-hidden rounded-xl shadow-lg flex flex-col justify-end h-full">
                    <img src={s.img} alt={s.title} className="w-full h-64 object-cover transform transition-transform duration-500 hover:scale-105" />
                    <div className="bg-white bg-opacity-80 p-4 text-center">
                      <h3 className="text-lg font-semibold">{s.title}</h3>
                    </div>
                  </div>
                  <div className="flip-card-back bg-[#42A5E1] text-white rounded-xl p-6 flex flex-col justify-center text-center">
                    <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                    <p className="text-sm mb-6">{s.description}</p>
                    <span className="inline-block bg-white text-[#42A5E1] px-6 py-2 rounded-md font-medium transition-transform transform hover:scale-105 cursor-pointer">
                      {t("home.services.learnMore")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
{/* <section className="py-16 bg-white border-t">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-3xl font-light text-[#1a2332] mb-10">
      {t("home.clients.heading")}
    </h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10 items-center">
      {[
        "/logos/1.png",
        "/logos/2.png",
        "/logos/3.png",
        "/logos/4.png",
        "/logos/5.png"
      ].map((logo, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center"
        >
          <img
            src={logo}
            alt="Client Logo"
            className="h-12 object-contain grayscale hover:grayscale-0 transition"
          />
        </motion.div>
      ))}
    </div>
  </div>
</section> */}

      {/* Testimonials Section */}
{/* <section className="py-20 bg-gray-50">
  <div className="container mx-auto px-6 text-center">

    <h2 className="text-3xl font-light text-[#1a2332] mb-12">
      {t("home.testimonials.heading")}
    </h2>

    <div className="grid md:grid-cols-3 gap-10">
      {(t("home.testimonials.list", { returnObjects: true }) as {
        name: string;
        feedback: string;
        image?: string;
      }[]).map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, rotate: -1 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-2xl shadow-lg text-center"
        >
          <img
            src={item.image || "/images/default-avatar.png"}
            alt={item.name}
            className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
          />

          <p className="text-gray-600 italic mb-4">“{item.feedback}”</p>
          <h4 className="text-lg font-semibold text-[#1a2332]">{item.name}</h4>
        </motion.div>
      ))}
    </div>

  </div>
</section> */}



      {/* === GCC Registration SECTION === */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-light text-[#1a2332] mb-4">
            {/* <Trans i18nKey="home.gcc.title">
              Registering a Company in <span className="text-[#42A5E1]">OMAN</span> or in the <span className="text-[#42A5E1]">GCC</span>?
            </Trans> */}
            <Trans i18nKey="home.gcc.title" components={{ 0: <span className="text-[#42A5E1]" />, 1: <span className="text-[#42A5E1]" /> }} />

          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            {t("home.gcc.subtitle")}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {gccCountries.map((c, i) => (
              <Link key={i} to={c.link}>
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 4 }}
                  transition={{ type: "spring", stiffness: 150, damping: 10 }}
                  className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer transform-gpu"
                >
                  <img src={c.img} alt={c.name} className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition duration-500 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-semibold tracking-wide">{c.name}</h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === OUR PROCESS SECTION === */}
      <section className="py-24 bg-gray-50 text-center">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-semibold text-[#1a2332] mb-4"
          >
            {t("home.process.title")}
          </motion.h2>
          <p className="text-gray-600 mb-20 text-lg max-w-3xl mx-auto">{t("home.process.subtitle")}</p>
          <div className="relative flex flex-col md:flex-row items-center justify-center md:justify-between max-w-5xl mx-auto space-y-16 md:space-y-0 md:space-x-8">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-[#42A5E1]/40 -z-10"></div>
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.2 }}
                className="flex flex-col items-center text-center w-60"
              >
                <div className="relative flex items-center justify-center w-20 h-20 bg-[#42A5E1] text-white rounded-2xl shadow-lg mb-6">
                  {step.icon}
                  <span className="absolute -bottom-3 bg-white text-[#42A5E1] w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm shadow-md">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#1a2332] mb-2">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-base">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === TRUST / POWER SECTION === */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-stretch rounded-2xl overflow-hidden shadow-md">
            <div className="bg-[#42A5E1] text-white flex flex-col justify-center p-12 w-full lg:w-[40%]">
              <h2 className="text-4xl font-light mb-4">{t("home.power.title")}</h2>
              <p className="text-white leading-relaxed text-base font-light">{t("home.power.subtitle")}</p>
            </div>
            <div className="bg-white flex-1 flex flex-col justify-center p-10 space-y-10">
              <div className="overflow-hidden mx-auto w-[1100px]">
                <ContinuousScrollingLogos
                  images={["power.jpeg","power7.png","power2.jpeg","power3.jpeg","power11.jpg","power5.png"]}
                  size={{ width: 150, height: 150 }}
                  gap={24}
                  speed={80}
                  direction="left"
                />
              </div>
              <div className="overflow-hidden mx-auto w-[1100px]">
                <ContinuousScrollingLogos
                  images={["power6.png","power1.jpeg","power9.png","power8.png","power10.png","power12.png",]}
                  size={{ width: 150, height: 150 }}
                  gap={24}
                  speed={90}
                  direction="right"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === WHY CHOOSE OSBIC === */}
      <section className="py-20 bg-[#42A5E1] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-light mb-12 text-center">{t("home.whyChoose.title")}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {whyChooseOSBIC.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-white flex-shrink-0 mt-1" size={20} />
                  <span className="text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === CTA === */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-light text-[#1a2332] mb-6">{t("home.cta.title")}</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">{t("home.cta.subtitle")}</p>
          <Link
            to="/contact"
            className="inline-block bg-[#42A5E1] text-white px-12 py-4 rounded-lg hover:bg-white hover:text-[#42A5E1] hover:border border-[#42A5E1] transition text-lg font-medium"
          >
            {t("home.cta.button")}
          </Link>
        </div>
      </section>
    </div>
  );
}
