import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CheckCircle, Users, Clock, DollarSign, Briefcase } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function BahrainBusinessSetup() {
  const { t } = useTranslation();

  const benefits = [
    t("businessSetup.bahrain.benefits.b1"),
    t("businessSetup.bahrain.benefits.b2"),
    t("businessSetup.bahrain.benefits.b3"),
    t("businessSetup.bahrain.benefits.b4"),
    t("businessSetup.bahrain.benefits.b5"),
    t("businessSetup.bahrain.benefits.b6"),
    t("businessSetup.bahrain.benefits.b7"),
    t("businessSetup.bahrain.benefits.b8"),
    t("businessSetup.bahrain.benefits.b9"),
  ];

  const businessTypes = [
    {
      title: t("businessSetup.bahrain.types.llc.title"),
      description: t("businessSetup.bahrain.types.llc.desc"),
      ownership: t("businessSetup.bahrain.types.llc.ownership"),
      minCapital: t("businessSetup.bahrain.types.llc.minCapital"),
      setup: t("businessSetup.bahrain.types.llc.setup"),
    },
    {
      title: t("businessSetup.bahrain.types.branch.title"),
      description: t("businessSetup.bahrain.types.branch.desc"),
      ownership: t("businessSetup.bahrain.types.branch.ownership"),
      minCapital: t("businessSetup.bahrain.types.branch.minCapital"),
      setup: t("businessSetup.bahrain.types.branch.setup"),
    },
    {
      title: t("businessSetup.bahrain.types.rep.title"),
      description: t("businessSetup.bahrain.types.rep.desc"),
      ownership: t("businessSetup.bahrain.types.rep.ownership"),
      minCapital: t("businessSetup.bahrain.types.rep.minCapital"),
      setup: t("businessSetup.bahrain.types.rep.setup"),
    },
  ];

  const documents = [
    t("businessSetup.bahrain.docs.d1"),
    t("businessSetup.bahrain.docs.d2"),
    t("businessSetup.bahrain.docs.d3"),
    t("businessSetup.bahrain.docs.d4"),
    t("businessSetup.bahrain.docs.d5"),
    t("businessSetup.bahrain.docs.d6"),
    t("businessSetup.bahrain.docs.d7"),
  ];

  const sectors = [
    t("businessSetup.bahrain.sectors.s1"),
    t("businessSetup.bahrain.sectors.s2"),
    t("businessSetup.bahrain.sectors.s3"),
    t("businessSetup.bahrain.sectors.s4"),
    t("businessSetup.bahrain.sectors.s5"),
    t("businessSetup.bahrain.sectors.s6"),
  ];

  return (
    <div className="min-h-screen pt-28 bg-gray-50 [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] font-sans">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#42A5E1] to-[#1e88e5] text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4"
        >
          <h1 className="text-5xl font-light mb-4">{t("businessSetup.bahrain.hero.title")}</h1>
          <p className="text-lg text-blue-100 font-light mb-10">{t("businessSetup.bahrain.hero.subtitle")}</p>
          <a
            href="https://api.whatsapp.com/send?phone=96896328888&text=Hello!%20I%27m%20interested%20in%20your%20business%20setup%20services%20in%20Bahrain.%20Could%20you%20please%20assist%20me%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-[#42A5E1] font-medium px-10 py-4 rounded-full text-lg shadow-lg hover:bg-blue-50 transition duration-300"
          >
            <FaWhatsapp size={24} className="text-[#42A5E1]" />
            {t("businessSetup.bahrain.global.contact")}
          </a>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-[#0f172a] mb-4">{t("businessSetup.bahrain.why.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("businessSetup.bahrain.why.desc")}</p>
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

      {/* Business Types */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-[#0f172a] mb-4">{t("businessSetup.bahrain.types.title")}</h2>
            {/* <p className="text-gray-600">{t("businessSetup.bahrain.types.subtitle")}</p> */}
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {businessTypes.map((type, index) => (
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
                      <div className="text-sm text-gray-500">{t("businessSetup.bahrain.subtitle.ownershipHead")}</div>
                      <div className="font-medium text-gray-700">{type.ownership}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="text-[#42A5E1]" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">{t("businessSetup.bahrain.subtitle.minimumCapital")}</div>
                      <div className="font-medium text-gray-700">{type.minCapital}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="text-[#42A5E1]" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">{t("businessSetup.bahrain.subtitle.minimumCapital")}</div>
                      <div className="font-medium text-gray-700">{type.setup}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents & Sectors */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-semibold text-[#0f172a] mb-6">{t("businessSetup.bahrain.docs.title")}</h2>
            <ul className="space-y-3">
              {documents.map((doc, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-[#42A5E1] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-[#0f172a] mb-6">{t("businessSetup.bahrain.sectors.title")}</h2>
            <div className="grid grid-cols-2 gap-3">
              {sectors.map((sector, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-100">
                  <Briefcase className="text-[#42A5E1] flex-shrink-0" size={18} />
                  <span className="text-gray-700 text-sm">{sector}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
