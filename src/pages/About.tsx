import { motion } from "framer-motion";
import { Users } from "lucide-react";
import "../globals.css";
import { useTranslation, Trans } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const team = [
    { name: "AYOOB SALEEM", roleKey: "about.team.roles.businessDevelopmentExecutive", image: "/images/TEAM/AYOOB.jpg" },
    { name: "SUVAID MAHMOOD", roleKey: "about.team.roles.businessConsultant", image: "../public/images/TEAM/SUWAID.jpg" },
    { name: "NAFIH NASSER", roleKey: "about.team.roles.businessConsultant", image: "../public/images/TEAM/NAFIH.jpg" },
    { name: "AMEENA RAFEEK", roleKey: "about.team.roles.businessConsultant", image: "../public/images/TEAM/AMEENA.jpg" },
    { name: "MISBA SADIA", roleKey: "about.team.roles.businessConsultant", image: "../public/images/TEAM/MISBA.jpg" },
    { name: "SADAF ETEHAD", roleKey: "about.team.roles.businessConsultant", image: "../public/images/TEAM/SADAF.jpg" },
    { name: "ALBIN THOMAS", roleKey: "about.team.roles.businessConsultant", image: "../public/images/TEAM/ALBIN.jpg" },
  ];

  const infoCards = [
    {
      titleKey: "about.cards.mission.title",
      backKey: "about.cards.mission.text",
    },
    {
      titleKey: "about.cards.vision.title",
      backKey: "about.cards.vision.text",
    },
    {
      titleKey: "about.cards.values.title",
      backKey: "about.cards.values.text",
    },
  ];

  return (
    <div className="min-h-screen pt-28">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#42A5E1] to-[#1e88e5] text-white text-center ">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-5xl font-light mb-4">{t("about.hero.title")}</h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              {t("about.hero.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <motion.img
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            src="/images/osbic-office.jpg"
            alt={t("about.story.officeAlt")}
            className="rounded-2xl shadow-xl object-cover"
          />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light text-[#1a2332] mb-6">
              {t("about.story.heading")}
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {t("about.story.p1")}
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {t("about.story.p2")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gradient-to-br from-[#f9fafb] to-[#eef1f5]">
        
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-light text-[#1a2332] mb-4">
              {t("about.core.heading")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("about.core.sub")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {infoCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ClassicCard
                  title={t(card.titleKey)}
                  description={t(card.backKey)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-light text-[#1a2332] mb-4">
              {t("about.founder.heading")}
            </h2>
            <p className="text-gray-600">
              {t("about.founder.sub")}
            </p>
          </motion.div>

          <div className="bg-gray-50 rounded-2xl p-10 md:p-14 shadow-lg">
            <div className="grid md:grid-cols-3 gap-10 items-center">
              <div>
                <img
                  src="/images/TEAM/founder.png"
                  alt={t("about.founder.name")}
                  className="rounded-xl shadow-lg w-full object-cover"
                />
              </div>
              <div className="md:col-span-2">
                <h3 className="text-3xl font-semibold text-[#1a2332] mb-2">
                  {t("about.founder.name")}
                </h3>
                <p className="text-[#42A5E1] font-medium mb-4">{t("about.founder.role")}</p>
                <p className="text-gray-600 leading-relaxed">
                  {t("about.founder.bio")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <Users className="w-14 h-14 text-[#42A5E1] mx-auto mb-4" />
            <h2 className="text-4xl font-light text-[#1a2332] mb-4">
              {t("about.team.heading")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("about.team.sub")}
            </p>
          </motion.div>

          {/* Top Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-8">
            {team.slice(0, 4).map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-4 group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332]/80 to-transparent opacity-0 group-hover:opacity-100 transition rounded-xl"></div>
                </div>
                <h3 className="text-lg font-semibold text-[#1a2332] mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600">{t(member.roleKey)}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.slice(4).map((member, index) => (
              <motion.div
                key={index + 4}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-4 group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332]/80 to-transparent opacity-0 group-hover:opacity-100 transition rounded-xl"></div>
                </div>
                <h3 className="text-lg font-semibold text-[#1a2332] mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600">{t(member.roleKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Photo */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-light text-[#1a2332] mb-6"
          >
            {t("about.group.heading")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 mb-10 max-w-2xl mx-auto"
          >
            {t("about.group.sub")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl max-w-6xl mx-auto"
          >
            <img
              src="/images/osbic-team.jpg"
              alt={t("about.group.imageAlt")}
              className="w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Group Companies */}
      <section className="py-20 bg-gradient-to-br from-[#f9fafb] to-[#eef1f5]">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-light text-[#1a2332] mb-4"
          >
            {t("about.groupCompanies.heading")}
          </motion.h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-sm md:text-base">
            {t("about.groupCompanies.sub")}
          </p>

          <div className="
            grid grid-cols-2
            sm:grid-cols-3 
            md:grid-cols-3 
            lg:grid-cols-6 
            gap-8 md:gap-12 lg:gap-10 
            items-center justify-items-center
          ">
            {[
              { name: "Maisarah Accounting", logo: "/images/maisarah-logo.png" },
              { name: "Osan Studio", logo: "/images/osan-studio-logo.png" },
              { name: "ASAS Service Center", logo: "/images/asas-logo.png" },
              { name: "Maisarah Accounting", logo: "/images/maisarah-logo.png" },
              { name: "Osan Studio", logo: "/images/osan-studio-logo.png" },
              { name: "ASAS Service Center", logo: "/images/asas-logo.png" },
            ].map((company, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all p-5 md:p-6 flex items-center justify-center w-36 h-24">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-h-10 object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-3">{company.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===========================
   Premium Classic Card (UPDATED)
=========================== */
function ClassicCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 
        shadow-md hover:shadow-xl transition-all text-center
        min-h-[13rem]        /* 📱 Mobile */
        md:min-h-[18rem]     /* 💻 Tablet */
        lg:min-h-[11rem]     /* 🖥️ Desktop (reduced) */
        flex flex-col justify-start
      "
    >
      <h3 className="text-xl font-semibold text-[#1a2332] mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed flex-1">{description}</p>
    </div>
  );
}
