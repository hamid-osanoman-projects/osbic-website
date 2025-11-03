import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  DollarSign,
  CheckCircle,
  Briefcase,
  Phone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Building2, FileText, Users, Clock } from "lucide-react";




export default function OmanBusinessSetup() {
  const { t } = useTranslation();

  // Fetch translated arrays
  const benefits = t("businessSetup.OMAN.whyChooseOman.benefits", { returnObjects: true });
  const businessTypes = t("businessSetup.OMAN.businessTypes.types", { returnObjects: true });
  const setupSteps = t("businessSetup.OMAN.setupProcess.steps", { returnObjects: true });
  const documents = t("businessSetup.OMAN.documentsSectors.documents", { returnObjects: true });
  const sectors = t("businessSetup.OMAN.documentsSectors.sectors", { returnObjects: true });
  // Setup Process icons mapped by step index
const setupStepsIcons = [Building2, FileText, Users, Clock];

  return (
    <div className="min-h-screen pt-28 bg-gray-50 font-sans [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#42A5E1] to-[#1e88e5] text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4"
        >
          <h1 className="text-5xl font-light mb-4">{t("businessSetup.OMAN.hero.title")}</h1>
          <p className="text-lg text-blue-100 font-light mb-10">{t("businessSetup.OMAN.hero.subtitle")}</p>
          <a
            href="https://api.whatsapp.com/send?phone=96896328888&text=Hello!%20I%27m%20interested%20in%20your%20business%20setup%20services%20in%20Oman.%20Could%20you%20please%20assist%20me%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-[#42A5E1] font-medium px-10 py-4 rounded-full text-lg shadow-lg hover:bg-blue-50 transition duration-300"
          >
            <FaWhatsapp size={24} className="text-[#42A5E1]" />
            {t("businessSetup.OMAN.hero.cta")}
          </a>
        </motion.div>
      </section>

      {/* Why Choose Oman */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-[#0f172a] mb-4">{t("businessSetup.OMAN.whyChooseOman.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light">{t("businessSetup.OMAN.whyChooseOman.description")}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-5 bg-blue-50 rounded-xl border border-blue-100"
              >
                <CheckCircle className="text-[#42A5E1] flex-shrink-0 mt-1" size={22} />
                <span className="text-gray-700 font-light">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Types */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-semibold text-[#0f172a] mb-4">{t("businessSetup.OMAN.businessTypes.title")}</h2>
            <p className="text-gray-600">{t("businessSetup.OMAN.businessTypes.description")}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {businessTypes.map((type: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition"
              >
                <h3 className="text-2xl font-semibold text-[#42A5E1] mb-3">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Users className="text-[#42A5E1]" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">{t("businessSetup.OMAN.businessTypes.subtitle.ownershipHead")}</div>
                      <div className="font-medium text-gray-700">{type.ownership}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="text-[#42A5E1]" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">{t("businessSetup.OMAN.businessTypes.subtitle.minimumCapital")}</div>
                      <div className="font-medium text-gray-700">{type.minCapital}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="text-[#42A5E1]" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">{t("businessSetup.OMAN.businessTypes.subtitle.setupTime")}</div>
                      <div className="font-medium text-gray-700">{type.setup}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup Process */}
      {/* Setup Process */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-semibold text-[#0f172a] mb-4">
        {t("businessSetup.OMAN.setupProcess.title")}
      </h2>
      <p className="text-gray-600">
        {t("businessSetup.OMAN.setupProcess.description")}
      </p>
    </motion.div>

    <div className="space-y-8">
      {setupSteps.map((step: any, index: number) => {
        // Pick icon by index
        const Icon = setupStepsIcons[index];

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-6 items-start"
          >
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-[#42A5E1] rounded-full flex items-center justify-center text-white text-xl font-bold">
                {step.step}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-[#0f172a] mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
            {Icon && <Icon className="text-[#42A5E1] flex-shrink-0" size={32} />}
          </motion.div>
        );
      })}
    </div>
  </div>
</section>



      {/* Documents & Sectors */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-semibold text-[#0f172a] mb-6">{t("businessSetup.OMAN.documentsSectors.documentsTitle")}</h2>
              <ul className="space-y-3">
                {documents.map((doc: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-[#42A5E1] flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-semibold text-[#0f172a] mb-6">{t("businessSetup.OMAN.documentsSectors.sectorsTitle")}</h2>
              <div className="grid grid-cols-2 gap-3">
                {sectors.map((sector: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-100">
                    <Briefcase className="text-[#42A5E1] flex-shrink-0" size={18} />
                    <span className="text-gray-700 text-sm">{sector}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="py-20 bg-gradient-to-br from-[#42A5E1] to-[#1C86C8] text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-semibold mb-6">{t("businessSetup.OMAN.cta.title")}</h2>
          <p className="text-xl mb-8 text-blue-50">{t("businessSetup.OMAN.cta.description")}</p>
          <a
            href="https://wa.me/96896328888"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-[#42A5E1] px-10 py-4 rounded-full text-lg font-medium shadow-lg hover:bg-blue-50 transition duration-300"
          >
            <Phone size={22} />
            {t("businessSetup.OMAN.cta.button")}
          </a>
        </motion.div>
      </section> */}
    </div>
  );
}
