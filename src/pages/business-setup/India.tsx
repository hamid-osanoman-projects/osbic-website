import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import { useState } from 'react';
import i18n from '../../i18n/config';

interface ServiceType {
  title: string;
  description: string;
}

interface ServicesData {
  title: string;
  description: string;
  types: ServiceType[];
}

export default function IndiaBusinessSetup() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const benefits: string[] = (t("businessSetup.india.why_choose.benefits", { returnObjects: true }) as string[]) || [];

  // Fetch the entire services object
  const servicesData: ServicesData = t("businessSetup.india.services", { returnObjects: true }) as ServicesData;

  return (
    <div className="min-h-screen pt-28 bg-gray-50 font-sans">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#42A5E1] to-[#1e88e5] text-white text-center relative overflow-hidden">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-light mb-4">{t("businessSetup.india.hero.title")}</h1>
          <p className="text-lg text-blue-100 font-light mb-10">{t("businessSetup.india.hero.subtitle")}</p>
          <a
            href="https://api.whatsapp.com/send?phone=96896328888&text=Hello!%20I'm%20interested%20in%20your%20business%20setup%20services%20in%20India.%20Could%20you%20please%20assist%20me?"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-[#42A5E1] font-medium px-10 py-4 rounded-full text-lg shadow-lg hover:bg-blue-50 transition duration-300"
          >
            <FaWhatsapp size={24} className="text-[#42A5E1]" />
            {t("businessSetup.india.hero.cta")}
          </a>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-[#0f172a] mb-4">{t("businessSetup.india.why_choose.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("businessSetup.india.why_choose.desc")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100"
              >
                <CheckCircle className="text-[#42A5E1] flex-shrink-0 mt-1" size={22} />
                <span className="text-gray-700 font-light">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-semibold text-[#0f172a] mb-4">
              {servicesData?.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {servicesData?.description}
            </p>
          </motion.div>

          {/* Accordion List */}
          <ul className="grid md:grid-cols-2 gap-4 text-lg items-start">
            {servicesData?.types?.map((service, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className={`flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border-l-4 border-transparent hover:border-[#42A5E1] overflow-hidden`}
                layout
              >
                {/* Header */}
                <div className="flex items-center justify-between p-5">
                  <span className="font-medium text-gray-800 transition-colors group-hover:text-[#42A5E1]">
                    {service.title}
                  </span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 transition-colors group-hover:text-[#42A5E1]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ rotate: activeIndex === index ? 90 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </motion.svg>
                </div>

                {/* Expandable content */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 pb-4 text-gray-600 border-t border-gray-100 text-sm leading-relaxed"
                    >
                      {service.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
