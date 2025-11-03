// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Building2, FileText, Users, Globe, Briefcase, FileCheck } from 'lucide-react';

// export default function Services() {
//   const services = [
//     {
//       icon: Building2,
//       title: 'Company Registration',
//       description: 'Complete business setup services including LLC, branch office, and establishment registration',
//       features: ['Business licensing', 'Trade name registration', 'Memorandum drafting', 'Commercial registration'],
//       link: '/services/company-registration'
//     },
//     {
//       icon: FileText,
//       title: 'Visa & Emigration Services',
//       description: 'Comprehensive visa processing and residency services for employees and dependents',
//       features: ['Employment visas', 'Family sponsorship', 'Visa renewals', 'Labour card processing'],
//       link: '/services/visa-emigration'
//     },
//     {
//       icon: Users,
//       title: 'ROP Services',
//       description: 'Royal Oman Police related services and documentation',
//       features: ['Police clearance', 'Security approvals', 'Civil ID processing', 'Passport services'],
//       link: '/services/rop-services'
//     },
//     {
//       icon: Briefcase,
//       title: 'PRO Services',
//       description: 'Professional Public Relations Officer services for government liaison',
//       features: ['Document processing', 'Government approvals', 'License renewals', 'Compliance management'],
//       link: '/services/pro-services'
//     },
//     {
//       icon: Globe,
//       title: 'Ministry Services',
//       description: 'Ministry-level documentation, attestation, and approval services',
//       features: ['Document attestation', 'Ministry approvals', 'Certificate authentication', 'Legal translation'],
//       link: '/services/ministry-services'
//     },
//     {
//       icon: FileCheck,
//       title: 'Additional Services',
//       description: 'Comprehensive support services for your business operations',
//       features: ['Document clearing', 'Business consulting', 'Office space solutions', 'Accounting support'],
//       link: '/services/additional-services'
//     }
//   ];

//   return (
//     <div className="min-h-screen pt-28">
//       <section className="py-20 bg-gradient-to-br from-[#1a2332] to-[#0f1520] text-white">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="max-w-3xl mx-auto text-center"
//           >
//             <h1 className="text-5xl font-light mb-6">Our Services</h1>
//             <p className="text-xl text-gray-300">
//               Comprehensive business solutions tailored to your needs in Oman
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {services.map((service, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1 }}
//                 className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-2xl transition group"
//               >
//                 <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition">
//                   <service.icon className="text-white" size={32} />
//                 </div>
//                 <h3 className="text-2xl font-semibold text-[#1a2332] mb-4">{service.title}</h3>
//                 <p className="text-gray-600 mb-6">{service.description}</p>
//                 <ul className="space-y-2 mb-6">
//                   {service.features.map((feature, i) => (
//                     <li key={i} className="flex items-center text-sm text-gray-600">
//                       <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
//                       {feature}
//                     </li>
//                   ))}
//                 </ul>
//                 <Link
//                   to={service.link}
//                   className="inline-block text-amber-600 font-medium hover:text-amber-700 transition"
//                 >
//                   Learn More →
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-4xl font-light text-[#1a2332] mb-6">Need a Custom Solution?</h2>
//           <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//             Every business is unique. Let us create a tailored package that meets your specific requirements.
//           </p>
//           <Link
//             to="/contact"
//             className="inline-block bg-amber-500 text-white px-12 py-4 rounded-lg hover:bg-amber-600 transition text-lg font-medium"
//           >
//             Request a Quote
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }




// ----------------------------------------------------------------------------------------------------------------------------------------------------

// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Building2, Globe2, Contact2, FileText, Users, Settings } from "lucide-react";

// const services = [
//   {
//     id: "company-registration",
//     title: "Company Registration",
//     description: "Full support for Commercial Registration (CR), trade name, licensing, and shareholder setup.",
//     icon: <Building2 className="text-amber-500 w-8 h-8" />,
//   },
//   {
//     id: "visa-emigration",
//     title: "Visa & Emigration Services",
//     description: "Comprehensive assistance with employment, investor, and family visas in Oman.",
//     icon: <Contact2 className="text-amber-500 w-8 h-8" />,
//   },
//   {
//     id: "rop-services",
//     title: "ROP Services",
//     description: "All Royal Oman Police services — visa stamping, clearance certificates, and vehicle registration.",
//     icon: <Globe2 className="text-amber-500 w-8 h-8" />,
//   },
//   {
//     id: "pro-services",
//     title: "PRO Services",
//     description: "Government liaison and document attestation handled by professional PRO representatives.",
//     icon: <Users className="text-amber-500 w-8 h-8" />,
//   },
//   {
//     id: "ministry-services",
//     title: "Ministry Services",
//     description: "MOCI, Labour, and Municipality registrations, renewals, and official correspondence.",
//     icon: <FileText className="text-amber-500 w-8 h-8" />,
//   },
//   {
//     id: "additional-services",
//     title: "Additional Services",
//     description: "Accounting, translation, branding, and IT setup support for your Oman-based business.",
//     icon: <Settings className="text-amber-500 w-8 h-8" />,
//   },
// ];

// export default function Services() {
//   return (
//     <div className="min-h-screen pt-28 bg-white">
//       {/* Hero Section */}
//       <section className="py-20 bg-gradient-to-br from-[#1a2332] to-[#0f1520] text-white text-center relative overflow-hidden">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="max-w-3xl mx-auto px-4"
//         >
//           <h1 className="text-4xl font-light mb-4">Our Services</h1>
//           <p className="text-gray-300 text-lg">
//             End-to-end business setup and government services for investors and entrepreneurs in Oman.
//           </p>
//         </motion.div>
//       </section>

//       {/* Services Grid */}
//       <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {services.map((service, index) => (
//           <motion.div
//             key={service.id}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
//           >
//             <div className="p-6 flex flex-col items-center text-center">
//               <div className="mb-4">{service.icon}</div>
//               <h3 className="text-xl font-semibold text-[#1a2332] mb-2">{service.title}</h3>
//               <p className="text-gray-600 text-sm mb-4">{service.description}</p>
//               <Link
//                 to={`/services/${service.id}`}
//                 className="text-amber-600 font-medium mt-auto hover:underline"
//               >
//                 Learn More →
//               </Link>
//             </div>
//           </motion.div>
//         ))}
//       </section>
//     </div>
//   );
// }

// ----------------------------------------------------------------------------------------------------------------------------------------------------





// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Building2, FileText, Users, Globe, Briefcase, FileCheck } from "lucide-react";

// interface SubService {
//   title: string;
//   description: string;
//   link: string;
// }

// interface ServiceCategory {
//   icon: any;
//   title: string;
//   color: string;
//   description: string;
//   subServices: SubService[];
// }

// export default function Services() {
//   const [openCategory, setOpenCategory] = useState<number | null>(null);

//   const serviceCategories: ServiceCategory[] = [
//     {
//       icon: Building2,
//       title: "Company Services",
//       color: "from-amber-500 to-amber-700",
//       description:
//         "Comprehensive company formation and business setup services including registration, documentation, and support.",
//       subServices: [
//         {
//           title: "Company Registration",
//           description:
//             "Set up LLCs, branches, or establishments with full documentation and compliance assistance.",
//           link: "/services/company-registration",
//         },
//         {
//           title: "PRO Services",
//           description:
//             "Government liaison, document processing, and compliance management handled professionally.",
//           link: "/services/pro-services",
//         },
//         {
//           title: "Additional Services",
//           description:
//             "Support services like office setup, accounting, and document clearing for your business operations.",
//           link: "/services/additional-services",
//         },
//       ],
//     },
//     {
//       icon: FileText,
//       title: "Visa Services",
//       color: "from-blue-500 to-blue-700",
//       description:
//         "Comprehensive visa and immigration services, including Golden, Investor, Visit, and Employment visas.",
//       subServices: [
//         {
//           title: "Golden Visa",
//           description:
//             "Long-term residence for investors with minimum investment of OMR 250,000 or 500,000.",
//           link: "/services/visa/golden-visa",
//         },
//         {
//           title: "Investor Visa",
//           description:
//             "For foreign investors establishing or investing in a business in Oman.",
//           link: "/services/visa/investor-visa",
//         },
//         {
//           title: "Visit Visa",
//           description:
//             "Tourist, business, or family visit visas for short-term stays in Oman.",
//           link: "/services/visa/visit-visa",
//         },
//         {
//           title: "Employment Visa",
//           description:
//             "Allows foreign nationals to legally work in Oman under local employer sponsorship.",
//           link: "/services/visa/employment-visa",
//         },
//       ],
//     },
//     {
//       icon: Globe,
//       title: "Government Services",
//       color: "from-green-500 to-green-700",
//       description:
//         "Ministry, ROP, and compliance-related services to ensure smooth business operations.",
//       subServices: [
//         {
//           title: "ROP Services",
//           description:
//             "Royal Oman Police documentation including civil ID, passport, and clearance services.",
//           link: "/services/rop-services",
//         },
//         {
//           title: "Ministry Services",
//           description:
//             "Attestation, approval, and document authentication across ministries.",
//           link: "/services/ministry-services",
//         },
//       ],
//     },
//   ];

//   return (
//     <div className="min-h-screen pt-28">
//       {/* Hero Section */}
//       <section className="py-20 bg-gradient-to-br from-[#1a2332] to-[#0f1520] text-white text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="max-w-3xl mx-auto px-4"
//         >
//           <h1 className="text-5xl font-light mb-6">Our Services</h1>
//           <p className="text-xl text-gray-300">
//             Explore comprehensive business solutions designed for investors and entrepreneurs in Oman.
//           </p>
//         </motion.div>
//       </section>

//       {/* Service Categories */}
//       <section className="py-20 bg-white">
//         <div className="container mx-auto px-4 max-w-6xl">
//           <div className="space-y-8">
//             {serviceCategories.map((category, index) => {
//               const Icon = category.icon;
//               const isOpen = openCategory === index;

//               return (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.1 }}
//                   className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
//                 >
//                   {/* Category Header */}
//                   <button
//                     onClick={() =>
//                       setOpenCategory(isOpen ? null : index)
//                     }
//                     className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div
//                         className={`w-14 h-14 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}
//                       >
//                         <Icon className="text-white" size={28} />
//                       </div>
//                       <div>
//                         <h2 className="text-2xl font-semibold text-[#1a2332]">
//                           {category.title}
//                         </h2>
//                         <p className="text-gray-600 text-sm">
//                           {category.description}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-gray-500 text-xl">
//                       {isOpen ? "−" : "+"}
//                     </div>
//                   </button>

//                   {/* Sub Services */}
//                   <AnimatePresence initial={false}>
//                     {isOpen && (
//                       <motion.div
//                         initial={{ opacity: 0, height: 0 }}
//                         animate={{ opacity: 1, height: "auto" }}
//                         exit={{ opacity: 0, height: 0 }}
//                         transition={{ duration: 0.3 }}
//                         className="bg-gray-50 px-8 py-6 space-y-6"
//                       >
//                         {category.subServices.map((sub, i) => (
//                           <div
//                             key={i}
//                             className="flex justify-between items-start border-b border-gray-200 pb-4"
//                           >
//                             <div>
//                               <h3 className="text-lg font-semibold text-[#1a2332]">
//                                 {sub.title}
//                               </h3>
//                               <p className="text-gray-600 text-sm">
//                                 {sub.description}
//                               </p>
//                             </div>
//                             <Link
//                               to={sub.link}
//                               className="text-amber-600 font-medium hover:text-amber-700 transition"
//                             >
//                               Learn More →
//                             </Link>
//                           </div>
//                         ))}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-4xl font-light text-[#1a2332] mb-6">
//             Need a Custom Solution?
//           </h2>
//           <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
//             Every business is unique. Let us create a tailored package that meets your specific requirements.
//           </p>
//           <Link
//             to="/contact"
//             className="inline-block bg-amber-500 text-white px-12 py-4 rounded-lg hover:bg-amber-600 transition text-lg font-medium"
//           >
//             Request a Quote
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }




// -----------------------------------------------------------------------------------------------------------------------------------------------------








import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Globe2,
  Contact2,
  FileText,
  Users,
  Settings,
} from "lucide-react";

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      id: "company-registration",
      title: t("service.companyRegistration.title"),
      description: t("service.companyRegistration.desc"),
      icon: <Building2 className="text-[#42A5E1] w-8 h-8" />,
    },
    {
      id: "visa-emigration",
      title: t("service.visaEmigration.title"),
      description: t("service.visaEmigration.desc"),
      icon: <Contact2 className="text-[#42A5E1] w-8 h-8" />,
    },
    {
      id: "rop-services",
      title: t("service.ropServices.title"),
      description: t("service.ropServices.desc"),
      icon: <Globe2 className="text-[#42A5E1] w-8 h-8" />,
    },
    {
      id: "pro-services",
      title: t("service.proServices.title"),
      description: t("service.proServices.desc"),
      icon: <Users className="text-[#42A5E1] w-8 h-8" />,
    },
    {
      id: "ministry-services",
      title: t("service.ministryServices.title"),
      description: t("service.ministryServices.desc"),
      icon: <FileText className="text-[#42A5E1] w-8 h-8" />,
    },
    {
      id: "additional-services",
      title: t("service.additionalServices.title"),
      description: t("service.additionalServices.desc"),
      icon: <Settings className="text-[#42A5E1] w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen pt-28 bg-gray-50 font-sans [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-[#42A5E1] to-[#1e88e5] text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto px-4"
        >
          <h1 className="text-5xl font-light mb-4">
            {t("servicesPage.title")}
          </h1>
          <p className="text-lg text-blue-100">
            {t("servicesPage.subtitle")}
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group"
          >
            <div className="p-8 flex flex-col items-center text-center h-full">
              <div className="mb-5 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              <h3 className="text-xl font-semibold text-[#1a2332] mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {service.description}
              </p>

              <Link
                to={`/services/${service.id}`}
                className="text-[#1e88e5] font-medium mt-auto hover:underline transition"
              >
                {t("general.learnMore")} →
              </Link>
            </div>
          </motion.div>
        ))}
      </section>
      
    </div>
  );
}

