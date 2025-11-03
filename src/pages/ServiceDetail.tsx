import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ProcessStep {
  step: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceDetailData {
  title: string;
  overview: string;
  benefits: string[];
  process: ProcessStep[];
  requirements: string[];
  faqs: FAQ[];
  subServices?: string[];
}

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("overview");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Load service dynamically from i18n
 // Load service dynamically from i18n
const service = t(`services.${id}`, {
  returnObjects: true,
}) as ServiceDetailData | undefined;


  const tabs = [
    { id: "overview", label: t("serviceDetails.tabs.overview") },
    { id: "benefits", label: t("serviceDetails.tabs.benefits") },
    { id: "process", label: t("serviceDetails.tabs.process") },
    { id: "requirements", label: t("serviceDetails.tabs.requirements") },
    { id: "faqs", label: t("serviceDetails.tabs.faqs") },
  ];

  if (!service) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-[#1a2332] mb-4">{t("serviceDetails.notFound.title")}</h2>
          <p className="text-gray-600 mb-6">{t("serviceDetails.notFound.message")}</p>
          <Link
            to="/"
            className="bg-[#42A5E1] hover:bg-[#1e88e5] text-white font-medium px-6 py-3 rounded-full shadow-lg transition"
          >
            {t("serviceDetails.notFound.homeBtn")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 font-sans bg-gray-50 [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-[#42A5E1] to-[#1e88e5] text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-light mb-4">{service.title}</h1>
          <p className="text-lg">{service.overview}</p>
        </motion.div>
      </section>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-gray-50 sticky top-20 z-30">
        <div className="max-w-5xl mx-auto flex justify-center flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 text-sm font-medium transition-all border-b-2 ${
                activeTab === tab.id
                  ? "border-[#42A5E1] text-[#42A5E1] font-semibold"
                  : "border-transparent text-gray-500 hover:text-[#42A5E1]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
            >
              <h2 className="text-2xl font-semibold mb-4 text-[#1a2332]">{t("serviceDetails.tabs.serviceOverview")}</h2>
              <p className="text-gray-700 leading-relaxed">{service.overview}</p>
              {service.subServices && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-[#1a2332] mb-3">{t("serviceDetails.tabs.serviceProvide")}</h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {service.subServices.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-gray-700 bg-white px-3 py-2 rounded-lg hover:bg-gray-100 hover:shadow-sm transition cursor-pointer"
                      >
                        <CheckCircle size={18} className="text-[#42A5E1]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "benefits" && (
            <motion.ul
              key="benefits"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
            >
              <h2 className="text-2xl font-semibold mb-4 text-[#1a2332]">{t("serviceDetails.tabs.benefits")}</h2>
              {service.benefits.map((b, i) => (
                <li key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#42A5E1]/10 transition">
                  <CheckCircle className="text-[#42A5E1]" size={20} />
                  <span className="text-gray-700">{b}</span>
                </li>
              ))}
            </motion.ul>
          )}

          {activeTab === "process" && (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
            >
              <h2 className="text-2xl font-semibold mb-6 text-[#1a2332]">{t("serviceDetails.tabs.process")}</h2>
              <div className="space-y-6">
                {service.process.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="border-l-4 border-[#42A5E1] pl-4 p-2 rounded-lg hover:bg-[#42A5E1]/10 transition"
                  >
                    <h3 className="text-lg font-semibold text-[#1a2332] mb-1">{p.step}</h3>
                    <p className="text-gray-700">{p.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "requirements" && (
            <motion.ul
              key="requirements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition"
            >
              <h2 className="text-2xl font-semibold mb-4 text-[#1a2332]">{t("serviceDetails.tabs.requirements")}</h2>
              {service.requirements.map((r, i) => (
                <li
                  key={i}
                  className="text-gray-700 flex items-start gap-2 p-2 rounded-lg hover:bg-[#42A5E1]/10 transition"
                >
                  <CheckCircle className="text-[#42A5E1] mt-1" size={18} />
                  {r}
                </li>
              ))}
            </motion.ul>
          )}

          {activeTab === "faqs" && (
            <motion.div
              key="faqs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold mb-4 text-[#1a2332]">{t("serviceDetails.tabs.faqs")}</h2>
              {service.faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    className="w-full flex justify-between items-center py-2 text-left"
                  >
                    <span className="font-medium text-[#1a2332]">{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`transform transition ${openFAQ === i ? "rotate-180 text-[#42A5E1]" : "rotate-0"}`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFAQ === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-700 pt-2"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
