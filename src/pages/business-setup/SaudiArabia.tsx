// src/pages/SaudiArabiaBusinessSetup.tsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
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
  Phone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function SaudiArabiaBusinessSetup(): JSX.Element {
  const { t, i18n } = useTranslation();

  // set html lang/dir and apply font class globally
  useEffect(() => {
    const lang = i18n.language || "en";
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    const fontClass = lang === "ar" ? "font-ar" : lang === "fa" ? "font-fa" : "font-en";
    document.documentElement.classList.remove("font-en", "font-ar", "font-fa");
    document.documentElement.classList.add(fontClass);
  }, [i18n.language]);

  const isRtl = i18n.language === "ar";

  // translation pulls (safe fallbacks to empty values/arrays)
  const hero = (t("businessSetup.saudiArabia.hero", { returnObjects: true }) as any) || {};
  const why = (t("businessSetup.saudiArabia.whyChooseSaudi", { returnObjects: true }) as any) || {};
  const businessTypesMeta = (t("businessSetup.saudiArabia.businessTypes", { returnObjects: true }) as any) || {};
  const businessTypes = (t("businessSetup.saudiArabia.businessTypes.types", { returnObjects: true }) as any) || [];
  const setupProcess = (t("businessSetup.saudiArabia.setupProcess", { returnObjects: true }) as any) || {};
  const setupSteps = (setupProcess.steps as any[]) || [];
  const documentsSection = (t("businessSetup.saudiArabia.documentsSectors", { returnObjects: true }) as any) || {};
  const documents = (documentsSection.documents as string[]) || [];
  const sectors = (documentsSection.sectors as string[]) || [];
  const cta = (t("businessSetup.saudiArabia.cta", { returnObjects: true }) as any) || {};

  // step icons mapping
  const stepIcons: Record<string | number, React.ElementType> = {
    1: FileText,
    2: Building2,
    3: Shield,
    4: CheckCircle,
    5: Users,
  };

  return (
    <div className="min-h-screen pt-28 bg-gray-50 font-sans [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-[#42A5E1] to-[#1e88e5] text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4"
        >
          <h1 className="text-5xl font-light mb-4">
            {hero.title ?? t("businessSetup.saudiArabia.hero.title")}
          </h1>

          <p className="text-lg text-blue-100 font-light mb-10">
            {hero.subtitle ?? t("businessSetup.saudiArabia.hero.subtitle")}
          </p>

          <a
            href={hero.whatsappLink ?? t("businessSetup.saudiArabia.hero.whatsappLink")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-[#42A5E1] font-medium px-10 py-4 rounded-full text-lg shadow-lg hover:bg-blue-50 transition duration-300"
            aria-label={hero.cta ?? t("businessSetup.saudiArabia.hero.cta")}
          >
            <FaWhatsapp size={24} className="text-[#42A5E1]" />
            <span>{hero.cta ?? t("businessSetup.saudiArabia.hero.cta")}</span>
          </a>
        </motion.div>
      </section>

      {/* Why Saudi */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mb-16 ${isRtl ? "text-right" : "text-center"}`}
          >
            <h2 className="text-4xl font-light text-[#0f172a] mb-4">
              {why.title ?? t("businessSetup.saudiArabia.whyChooseSaudi.title")}
            </h2>
            <p className={`text-gray-600 max-w-2xl mx-auto font-light ${isRtl ? "mx-0" : ""}`}>
              {why.subtitle ?? t("businessSetup.saudiArabia.whyChooseSaudi.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(why.benefits ?? (t("businessSetup.saudiArabia.whyChooseSaudi.benefits", { returnObjects: true }) as string[] || [])).map(
              (benefit: string, index: number) => (
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
              )
            )}
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
            className={`mb-16 ${isRtl ? "text-right" : "text-center"}`}
          >
            <h2 className="text-4xl font-semibold text-[#0f172a] mb-4">
              {businessTypesMeta.title ?? t("businessSetup.saudiArabia.businessTypes.title")}
            </h2>
            <p className="text-gray-600">
              {businessTypesMeta.description ?? t("businessSetup.saudiArabia.businessTypes.description")}
            </p>
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
                      <div className="text-sm text-gray-500">
                        {businessTypesMeta.subtitle?.ownershipHead ?? t("businessSetup.saudiArabia.businessTypes.subtitle.ownershipHead")}
                      </div>
                      <div className="font-medium text-gray-700">{type.ownership}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <DollarSign className="text-[#42A5E1]" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">
                        {businessTypesMeta.subtitle?.minimumCapital ?? t("businessSetup.saudiArabia.businessTypes.subtitle.minimumCapital")}
                      </div>
                      <div className="font-medium text-gray-700">{type.minCapital}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="text-[#42A5E1]" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">
                        {businessTypesMeta.subtitle?.setupTime ?? t("businessSetup.saudiArabia.businessTypes.subtitle.setupTime")}
                      </div>
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`mb-16 ${isRtl ? "text-right" : "text-center"}`}
          >
            <h2 className="text-4xl font-semibold text-[#0f172a] mb-4">
              {setupProcess.title ?? t("businessSetup.saudiArabia.setupProcess.title")}
            </h2>
            <p className="text-gray-600">{setupProcess.subtitle ?? t("businessSetup.saudiArabia.setupProcess.subtitle")}</p>
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

                  {StepIcon ? <StepIcon className="text-[#42A5E1] flex-shrink-0" size={32} /> : null}
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
              <h2 className="text-3xl font-semibold text-[#0f172a] mb-6">
                {documentsSection.documentsTitle ?? t("businessSetup.saudiArabia.documentsSectors.documentsTitle")}
              </h2>
              <ul className="space-y-3">
                {documents.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-[#42A5E1] flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-semibold text-[#0f172a] mb-6">
                {documentsSection.sectorsTitle ?? t("businessSetup.saudiArabia.documentsSectors.sectorsTitle")}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {sectors.map((sector, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-100">
                    <Briefcase className="text-[#42A5E1] flex-shrink-0" size={18} />
                    <span className="text-gray-700 text-sm">{sector}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      {/* <section className="py-12 bg-gradient-to-br from-[#42A5E1] to-[#1C86C8] text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">
            {cta.title ?? t("businessSetup.saudiArabia.cta.title")}
          </h2>
          <p className="text-lg mb-6">
            {cta.description ?? t("businessSetup.saudiArabia.cta.description")}
          </p>

          <a
            href={hero.whatsappLink ?? t("businessSetup.saudiArabia.hero.whatsappLink")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-[#42A5E1] px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-blue-50 transition duration-300"
          >
            <Phone size={22} />
            {cta.button ?? t("businessSetup.saudiArabia.cta.button") ?? (hero.cta ?? t("businessSetup.saudiArabia.hero.cta"))}
          </a>
        </motion.div>
      </section> */}


    </div>
  );
}
