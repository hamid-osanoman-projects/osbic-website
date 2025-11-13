// src/pages/UAEBusinessSetup.tsx
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Building2,
  FileText,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  Shield,
  Briefcase,
  Phone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

/**
 * UAEBusinessSetup.tsx
 * - Fully i18n-driven (uses t(...) for every string)
 * - Handles RTL/LTR by setting documentElement.dir and documentElement.lang
 * - Uses language-specific font classes (font-en, font-ar, font-fa)
 *
 * NOTES:
 * - Ensure your i18n json contains keys under businessSetup.UAE.* as in the en.json you provided.
 * - Add CSS font classes in your global styles or Tailwind config:
 *     .font-en { font-family: 'Inter', sans-serif; }
 *     .font-ar { font-family: 'Cairo', sans-serif; }  // or your preferred Arabic font
 *     .font-fa { font-family: 'Vazir', sans-serif; }  // or your preferred Farsi font
 */

export default function UAEBusinessSetup(): JSX.Element {
  const { t, i18n } = useTranslation();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // update html dir & lang and apply font class to body (or html)
  useEffect(() => {
    const lang = i18n.language || "en";
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    // Apply font class to html so Tailwind can use it globally
    const fontClass =
      lang === "ar" ? "font-ar" : lang === "fa" ? "font-fa" : "font-en";
    // remove any previous font classes then add
    document.documentElement.classList.remove("font-en", "font-ar", "font-fa");
    document.documentElement.classList.add(fontClass);
  }, [i18n.language]);

  // Pull arrays/objects from translations; use safe fallback to empty arrays
  const hero = t("businessSetup.UAE.hero", { returnObjects: true }) as {
    title?: string;
    subtitle?: string;
    cta?: string;
    whatsappLink?: string;
  };

  const why = t("businessSetup.UAE.whyChooseUAE", { returnObjects: true }) as {
    title?: string;
    subtitle?: string;
    benefits?: string[];
  };

  const businessTypes = (t("businessSetup.UAE.businessTypes.types", {
    returnObjects: true,
  }) as any[]) || [];

  const businessTypesMeta = t("businessSetup.UAE.businessTypes", {
    returnObjects: true,
  }) as { title?: string; description?: string; subtitle?: any };

  const setupSteps = (t("businessSetup.UAE.setupProcess.steps", {
    returnObjects: true,
  }) as any[]) || [];

  const documents = (t("businessSetup.UAE.documentsSectors.documents", {
    returnObjects: true,
  }) as string[]) || [];

  const sectors = (t("businessSetup.UAE.documentsSectors.sectors", {
    returnObjects: true,
  }) as string[]) || [];

  // Helper: detect RTL
  const isRtl = i18n.language === "ar";

  // Map icons for steps if you prefer icons per step (use default icons)
  const stepIcons: Record<number, React.ElementType> = {
    1: FileText,
    2: Building2,
    3: Shield,
    4: CheckCircle,
    5: Users,
  };

  return (
    <div className="min-h-screen pt-28 bg-gray-50 font-sans [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      {/* HERO */}
      <section className="py-16 bg-gradient-to-br from-[#42A5E1] to-[#1e88e5] text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4"
        >
          <h1 className="text-5xl font-light mb-4">
            {hero?.title ?? t("businessSetup.UAE.hero.title")}
          </h1>

          <p className="text-lg text-blue-100 font-light mb-10">
            {hero?.subtitle ?? t("businessSetup.UAE.hero.subtitle")}
          </p>

          <a
            href={hero?.whatsappLink ?? t("businessSetup.UAE.hero.whatsappLink")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-[#42A5E1] font-medium px-10 py-4 rounded-full text-lg shadow-lg hover:bg-blue-50 transition duration-300"
            aria-label={hero?.cta ?? t("businessSetup.UAE.hero.cta")}
          >
            <FaWhatsapp size={24} className="text-[#42A5E1]" />
            <span>{hero?.cta ?? t("businessSetup.UAE.hero.cta")}</span>
          </a>
        </motion.div>
      </section>

      {/* WHY CHOOSE UAE */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mb-16 ${isRtl ? "text-right" : "text-center"}`}
          >
            <h2 className="text-4xl font-light text-[#0f172a] mb-4">
              {why?.title ?? t("businessSetup.UAE.whyChooseUAE.title")}
            </h2>
            <p className={`text-gray-600 max-w-2xl mx-auto font-light ${isRtl ? "mx-0" : ""}`}>
              {why?.subtitle ?? t("businessSetup.UAE.whyChooseUAE.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(why?.benefits ?? (t("businessSetup.UAE.whyChooseUAE.benefits", { returnObjects: true }) as string[] || [])).map(
              (benefit: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 p-5 bg-blue-50 rounded-xl border border-blue-100"
                >
                  <CheckCircle
                    className="text-[#42A5E1] flex-shrink-0 mt-1"
                    size={22}
                  />
                  <span className="text-gray-700 font-light">{benefit}</span>
                </motion.div>
              )
            )}
          </div>
        </div>
      </section>

      {/* BUSINESS TYPES */}
{/* BUSINESS TYPES */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-6">
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-16 ${isRtl ? "text-right" : "text-center"}`}
    >
      <h2 className="text-4xl font-semibold text-[#0f172a] mb-4">
        {(businessTypesMeta && businessTypesMeta.title) ?? t("businessSetup.UAE.businessTypes.title")}
      </h2>
      <p className="text-gray-600">
        {(businessTypesMeta && businessTypesMeta.description) ?? t("businessSetup.UAE.businessTypes.description")}
      </p>
    </motion.div>

    {/* Accordion List */}
    <ul className="grid md:grid-cols-2 gap-4 text-lg items-start">
      {businessTypes.map((type: any, index: number) => (
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
          {/* Header */}
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
                {type.description}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.li>
      ))}
    </ul>
  </div>
</section>


      {/* SETUP PROCESS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mb-16 ${isRtl ? "text-right" : "text-center"}`}
          >
            <h2 className="text-4xl font-semibold text-[#0f172a] mb-4">
              {t("businessSetup.UAE.setupProcess.title")}
            </h2>
            <p className="text-gray-600">{t("businessSetup.UAE.setupProcess.subtitle")}</p>
          </motion.div>

          <div className="space-y-8">
            {setupSteps.map((step: any, index: number) => {
              const StepIcon = stepIcons[step.step] ?? (step.icon ?? (() => null));
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex gap-6 items-start ${isRtl ? "flex-row-reverse" : "flex-row"}`}
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

                  {StepIcon ? (
                    <StepIcon className="text-[#42A5E1] flex-shrink-0" size={32} />
                  ) : null}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DOCUMENTS & SECTORS */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold text-[#0f172a] mb-6">
                {t("businessSetup.UAE.documentsSectors.documentsTitle") ?? "Required Documents"}
              </h2>
              <ul className="space-y-3">
                {documents.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle
                      className="text-[#42A5E1] flex-shrink-0 mt-1"
                      size={20}
                    />
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-semibold text-[#0f172a] mb-6">
                {t("businessSetup.UAE.documentsSectors.sectorsTitle") ?? "Popular Business Sectors"}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {sectors.map((sector, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-100"
                  >
                    <Briefcase className="text-[#42A5E1] flex-shrink-0" size={18} />
                    <span className="text-gray-700 text-sm">{sector}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      {/* <section className="py-12 bg-gradient-to-br from-[#42A5E1] to-[#1C86C8] text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-semibold mb-4">
            {t("businessSetup.UAE.cta.title") ?? "Ready to Start Your Business in UAE?"}
          </h2>
          <p className="text-lg mb-6">
            {t("businessSetup.UAE.cta.description") ?? "Our expert team will guide you through every step of the process."}
          </p>

          <a
            href={t("businessSetup.UAE.hero.whatsappLink") ?? hero.whatsappLink ?? "https://wa.me/96896328888"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-[#42A5E1] px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-blue-50 transition duration-300"
          >
            <Phone size={22} />
            {t("businessSetup.UAE.cta.button") ?? t("businessSetup.UAE.hero.cta") ?? "Connect With Us"}
          </a>
        </motion.div>
      </section> */}
    </div>
  );
}
