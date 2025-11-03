import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
import {
  Building2,
  FileText,
  Users,
  Clock,
  DollarSign,
  CheckCircle,
  Briefcase,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function IranBusinessSetup() {
  const { t } = useTranslation();

  // Hero
  const hero = t("businessSetup.iran.hero", { returnObjects: true }) as {
    title?: string;
    subtitle?: string;
    cta?: string;
  };

  // Benefits
  const why = t("businessSetup.iran.why_choose", { returnObjects: true }) as {
    title?: string;
    desc?: string;
    benefits?: string[];
  };

  // Business Structures
  const businessStructures = t("businessSetup.iran.business_structures", {
    returnObjects: true,
  }) as {
    title?: string;
    types?: {
      title: string;
      description: string;
      ownership: string;
      minCapital: string;
      setup: string;
    }[];
    labels?: {
      ownership: string;
      minimumCapital: string;
      setupTime: string;
    };
  };

  // Setup Steps
  const setupProcess = t("businessSetup.iran.process", { returnObjects: true }) as {
    title?: string;
    steps?: { title: string; desc: string }[];
  };

  // Documents
  const documentsData = t("businessSetup.iran.documents", { returnObjects: true }) as {
    title?: string;
    list?: string[];
  };

  // Free Zones
  const freezonesData = t("businessSetup.iran.freezones", { returnObjects: true }) as {
    title?: string;
    zones?: string[];
  };

  // Icons for steps
  const stepIcons = [FileText, Building2, FileText, CheckCircle, Users];

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
          <h1 className="text-5xl font-light mb-4">{hero?.title}</h1>
          <p className="text-lg text-blue-100 font-light mb-10">{hero?.subtitle}</p>
          <a
            href={`https://api.whatsapp.com/send?phone=96896328888&text=Hello! I'm interested in your business setup services in Iran. Could you please assist me?`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-[#42A5E1] font-medium px-10 py-4 rounded-full text-lg shadow-lg hover:bg-blue-50 transition duration-300"
          >
            <FaWhatsapp size={24} className="text-[#42A5E1]" />
            {hero?.cta}
          </a>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-[#0f172a] mb-4">{why?.title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{why?.desc}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {why?.benefits?.map((benefit, index) => (
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

      {/* Business Structures */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-light text-[#0f172a] mb-12 text-center">
            {businessStructures?.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {businessStructures?.types?.map((type, index) => (
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
                      <div className="text-sm text-gray-500">{businessStructures.labels?.ownership}</div>
                      <div className="font-medium text-gray-700">{type.ownership}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="text-[#42A5E1]" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">{businessStructures.labels?.minimumCapital}</div>
                      <div className="font-medium text-gray-700">{type.minCapital}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="text-[#42A5E1]" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">{businessStructures.labels?.setupTime}</div>
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
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-light text-[#0f172a] mb-12 text-center">
            {setupProcess?.title}
          </h2>
          <div className="space-y-8">
            {setupProcess?.steps?.map((step, index) => {
              const StepIcon = stepIcons[index];
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
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-[#0f172a] mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                  {StepIcon && <StepIcon className="text-[#42A5E1] flex-shrink-0" size={32} />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Documents & Freezones */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl font-light text-[#0f172a] mb-6">{documentsData.title}</h2>
            <ul className="space-y-3">
              {documentsData.list?.map((doc, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-[#42A5E1] flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">{doc}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="text-3xl font-semibold text-[#0f172a] mb-6">{freezonesData.title}</h2>
            <div className="grid grid-cols-2 gap-3">
              {freezonesData.zones?.map((zone, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-white rounded-lg border border-blue-100"
                >
                  <Briefcase className="text-[#42A5E1] flex-shrink-0" size={18} />
                  <span className="text-gray-700 text-sm">{zone}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
