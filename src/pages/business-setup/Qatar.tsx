import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Building2,
  FileText,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  Shield,
  Briefcase,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";

export default function QatarBusinessSetup() {
  const { t, i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const benefits = [
    t("businessSetup.qatar.benefits.b1"),
    t("businessSetup.qatar.benefits.b2"),
    t("businessSetup.qatar.benefits.b3"),
    t("businessSetup.qatar.benefits.b4"),
    t("businessSetup.qatar.benefits.b5"),
    t("businessSetup.qatar.benefits.b6"),
    t("businessSetup.qatar.benefits.b7"),
    t("businessSetup.qatar.benefits.b8"),
    t("businessSetup.qatar.benefits.b9"),
  ];

  // const businessTypes = [
  //   {
  //     title: t("businessSetup.qatar.businessTypes.types.title"),
  //     description: t("businessSetup.qatar.businessTypes.llc.desc"),
  //     ownership: t("businessSetup.qatar.businessTypes.llc.ownership"),
  //     minCapital: "QAR 200,000",
  //     setup: "10-14 " + t("businessSetup.global.days"),
  //   },
  //   {
  //     title: t("businessSetup.qatar.types.qfc.title"),
  //     description: t("businessSetup.qatar.types.qfc.desc"),
  //     ownership: t("businessSetup.qatar.types.qfc.ownership"),
  //     minCapital: "QAR 1,000",
  //     setup: "7-10 " + t("businessSetup.global.days"),
  //   },
  //   {
  //     title: t("businessSetup.qatar.types.branch.title"),
  //     description: t("businessSetup.qatar.types.branch.desc"),
  //     ownership: t("businessSetup.qatar.types.branch.ownership"),
  //     minCapital: t("businessSetup.qatar.types.branch.cap"),
  //     setup: "14-21 " + t("businessSetup.global.days"),
  //   },
  //   {
  //     title: t("businessSetup.qatar.types.rep.title"),
  //     description: t("businessSetup.qatar.types.rep.desc"),
  //     ownership: t("businessSetup.qatar.types.rep.ownership"),
  //     minCapital: t("businessSetup.qatar.types.rep.cap"),
  //     setup: "10-15 " + t("businessSetup.global.days"),
  //   },
  // ];
   const businessTypesData = t("businessSetup.qatar.businessTypes", { returnObjects: true }) as {
  title: string;
  description: string;
  types: { title: string; description: string }[];
};

  const setupSteps = [
    {
      step: 1,
      title: t("businessSetup.qatar.steps.s1.title"),
      description: t("businessSetup.qatar.steps.s1.desc"),
      icon: FileText,
    },
    {
      step: 2,
      title: t("businessSetup.qatar.steps.s2.title"),
      description: t("businessSetup.qatar.steps.s2.desc"),
      icon: Building2,
    },
    {
      step: 3,
      title: t("businessSetup.qatar.steps.s3.title"),
      description: t("businessSetup.qatar.steps.s3.desc"),
      icon: Shield,
    },
    {
      step: 4,
      title: t("businessSetup.qatar.steps.s4.title"),
      description: t("businessSetup.qatar.steps.s4.desc"),
      icon: CheckCircle,
    },
    {
      step: 5,
      title: t("businessSetup.qatar.steps.s5.title"),
      description: t("businessSetup.qatar.steps.s5.desc"),
      icon: Users,
    },
  ];

  const documents = [
    t("businessSetup.qatar.docs.d1"),
    t("businessSetup.qatar.docs.d2"),
    t("businessSetup.qatar.docs.d3"),
    t("businessSetup.qatar.docs.d4"),
    t("businessSetup.qatar.docs.d5"),
    t("businessSetup.qatar.docs.d6"),
    t("businessSetup.qatar.docs.d7"),
    t("businessSetup.qatar.docs.d8"),
  ];

  const sectors = [
    t("businessSetup.qatar.sectors.s1"),
    t("businessSetup.qatar.sectors.s2"),
    t("businessSetup.qatar.sectors.s3"),
    t("businessSetup.qatar.sectors.s4"),
    t("businessSetup.qatar.sectors.s5"),
    t("businessSetup.qatar.sectors.s6"),
    t("businessSetup.qatar.sectors.s7"),
    t("businessSetup.qatar.sectors.s8"),
    t("businessSetup.qatar.sectors.s9"),
    t("businessSetup.qatar.sectors.s10"),
  ];

  const isRTL = i18n.dir() === "rtl";

  return (
    <div className={`min-h-screen pt-28 font-sans ${isRTL ? "rtl" : "ltr"} bg-gray-50 [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]`}>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#42A5E1] to-[#1e88e5] text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4"
        >
          <h1 className="text-5xl font-light mb-4">{t("businessSetup.qatar.hero.title")}</h1>
          <p className="text-lg text-blue-100 font-light mb-10">
            {t("businessSetup.qatar.hero.subtitle")}
          </p>
          <a
            href={`https://api.whatsapp.com/send?phone=96896328888&text=Hello!%20I'm%20interested%20in%20your%20business%20setup%20services%20in%20Qatar.%20Could%20you%20please%20assist%20me%3F`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-[#42A5E1] font-medium px-10 py-4 rounded-full text-lg shadow-lg hover:bg-blue-50 transition duration-300"
          >
            <FaWhatsapp size={24} className="text-[#42A5E1]" />
            {t("businessSetup.global.contact")}
          </a>
        </motion.div>
      </section>

      {/* Why Qatar */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-[#0f172a] mb-4">{t("businessSetup.qatar.why.title")}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light">{t("businessSetup.qatar.why.desc")}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
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

      {/* BUSINESS TYPES - Qatar */}
{/* BUSINESS TYPES - Qatar */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-6">
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-semibold text-[#0f172a] mb-4">
        {t("businessSetup.qatar.businessTypes.title")}
      </h2>
      <p className="text-gray-600">
        {t("businessSetup.qatar.businessTypes.description")}
      </p>
    </motion.div>

    {/* Accordion List */}
    <ul className="grid md:grid-cols-2 gap-4 text-lg items-start">
  {businessTypesData.types.map((type, index) => (
    <motion.li
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onClick={() => setActiveIndex(activeIndex === index ? null : index)}
      className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border-l-4 border-transparent hover:border-[#42A5E1] overflow-hidden"
      layout
    >
      <div className="flex items-center justify-between p-5">
        <span className="font-medium text-gray-800 transition-colors group-hover:text-[#42A5E1]">
          {type.title}
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </motion.svg>
      </div>

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
            {type.description}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  ))}
</ul>

  </div>
</section>



      {/* Setup Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-semibold text-[#0f172a] mb-4">{t("businessSetup.qatar.steps.title")}</h2>
          </motion.div>

          <div className="space-y-8">
            {setupSteps.map((step, index) => (
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
                  <h3 className="text-2xl font-semibold text-[#0f172a] mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <step.icon className="text-[#42A5E1] flex-shrink-0" size={32} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents & Sectors */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-semibold text-[#0f172a] mb-6">{t("businessSetup.qatar.docs.title")}</h2>
              <ul className="space-y-3">
                {documents.map((doc, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-[#42A5E1] flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-semibold text-[#0f172a] mb-6">{t("businessSetup.qatar.sectors.title")}</h2>
              <div className="grid grid-cols-2 gap-3">
                {sectors.map((sector, index) => (
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
    </div>
  );
}
