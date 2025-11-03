import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";

export default function IndiaBusinessSetup() {
  const { t } = useTranslation();

  const benefits: string[] = (t("businessSetup.india.why_choose.benefits", { returnObjects: true }) as string[]) || [];
const services: string[] = (t("businessSetup.india.services.list", { returnObjects: true }) as string[]) || [];


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

      {/* Benefits */}
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

      {/* Services */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-[#0f172a] mb-4">{t("businessSetup.india.services.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("businessSetup.india.services.desc")}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition"
              >
                <h3 className="text-2xl font-semibold text-[#42A5E1] mb-3">{service}</h3>
                {/* <p className="text-gray-600">Complete {service.toLowerCase()} assistance</p> */}
                <p className="text-gray-600">{service}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
