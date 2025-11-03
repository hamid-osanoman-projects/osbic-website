import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";
import { supabase } from "../integrations/supabase/client";
import Toast from "../components/Toast";
import type { TablesInsert } from "../integrations/supabase/types";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/config.ts";

interface FormData {
  full_name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

interface FormErrors {
  full_name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
}

export default function Contact() {
  const { t } = useTranslation();
  const isRTL = i18n.dir() === "rtl"; // your i18n direction check

  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
    isVisible: boolean;
  }>({ message: "", type: "success", isVisible: false });

  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(
        () => setToast((prev) => ({ ...prev, isVisible: false })),
        5000
      );
      return () => clearTimeout(timer);
    }
  }, [toast.isVisible]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = t("contact.errors.full_name");
    if (!formData.phone.trim()) newErrors.phone = t("contact.errors.phone");
    if (!formData.email.trim()) newErrors.email = t("contact.errors.email");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = t("contact.errors.email_invalid");
    if (!formData.service) newErrors.service = t("contact.errors.service");
    if (!formData.message.trim()) newErrors.message = t("contact.errors.message");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type, isVisible: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast(t("contact.toast.fill_fields"), "error");
      return;
    }

    setIsSubmitting(true);

    const trimmedData: TablesInsert<"contact_messages"> = {
      full_name: formData.full_name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      service: formData.service,
      message: formData.message.trim()
    };

    try {
      // Save to Supabase
      const { error: dbError } = await supabase
        .from("contact_messages")
        .insert([trimmedData as any]);

      if (dbError) {
        console.error("Database error:", dbError);
        showToast(t("contact.toast.db_error"), "error");
        return;
      }

      // Send to Google Sheet
      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycbyQtETLPqbmzfh9ECsI9jnxcr7OK9OjIElru60z8dScnG41HrLhqnfvA2tBdqiAzsWIYg/exec",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trimmedData),
            mode: "no-cors"
          }
        );

        showToast(t("contact.toast.success"), "success");

        setFormData({
          full_name: "",
          phone: "",
          email: "",
          service: "",
          message: ""
        });
      } catch (err) {
        console.error("Error sending to Google Sheet:", err);
        showToast(t("contact.toast.sheet_error"), "error");
      }

      setErrors({});
    } catch (err) {
      console.error("Form submission error:", err);
      showToast(t("contact.toast.general_error"), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-28 font-sans overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gray-50 [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
        animate={{ backgroundPosition: ["0px 0px", "20px 20px", "0px 0px"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-[#42A5E1] to-[#1e88e5] text-white text-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <h1 className="text-5xl font-light mb-4">{t("contact.hero.title")}</h1>
              <p className="text-lg text-blue-100 mb-10">{t("contact.hero.subtitle")}</p>
              <a
                href="https://wa.me/96896328888"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-[#42A5E1] font-medium px-10 py-4 rounded-full text-lg shadow-lg hover:bg-blue-50 transition duration-300"
              >
                <FaWhatsapp size={24} className="text-[#42A5E1]" />
                {t("contact.hero.cta")}
              </a>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Left Info */}
              <div className="bg-white px-10 py-14 border-r border-gray-100 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-medium text-[#1a2332] mb-8">{t("contact.info.title")}</h2>
                  <p className="text-gray-600 mb-10 leading-relaxed">{t("contact.info.desc")}</p>

                  <div className="space-y-6">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-[#42A5E1]/10 rounded-full flex items-center justify-center">
                        <MapPin className="text-[#42A5E1]" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1a2332]">{t("contact.info.head_office.title")}</h3>
                        <p className="text-gray-600">{t("contact.info.head_office.address")}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-[#42A5E1]/10 rounded-full flex items-center justify-center">
                        <Mail className="text-[#42A5E1]" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1a2332]">{t("contact.info.email.title")}</h3>
                        <p className="text-gray-600">{t("contact.info.email.address")}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-[#42A5E1]/10 rounded-full flex items-center justify-center">
                        <Phone className="text-[#42A5E1]" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1a2332]">{t("contact.info.phone.title")}</h3>
                        <p className="text-gray-600">{t("contact.info.phone.number")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 rounded-xl overflow-hidden shadow-lg border border-gray-200">
                    <iframe
                      title="Map"
                      width="100%"
                      height="280"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={t("contact.info.map_embed")}
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Right Form */}
              <div className="bg-white px-10 py-14">
                <h2 className="text-3xl font-medium text-[#1a2332] mb-8">{t("contact.form.title")}</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Full Name */}
                  <div className="relative w-full">
                    <label className="block text-gray-700 mb-2 font-medium">
                      {t("contact.form.full_name.label")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className={`appearance-none w-full bg-white border rounded-xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800 transition ${
                        errors.full_name
                          ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                          : "border-gray-300"
                      }`}
                      placeholder={t("contact.form.full_name.placeholder")}
                    />
                    {errors.full_name && (
                      <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div className="relative w-full">
                    <label className="block text-gray-700 mb-2 font-medium">
                      {t("contact.form.phone.label")} <span className="text-red-500">*</span>
                    </label>
                    <PhoneInput
  country="om"
  onlyCountries={["om","ae","sa","kw","bh","qa","ir","in"]}
  value={formData.phone}
  onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
  
  inputStyle={{
    width: "100%",
    height: "48px",
    paddingLeft: isRTL ? "12px" : "60px",
    paddingRight: isRTL ? "60px" : "12px",
    borderRadius: "12px",
    border: errors.phone ? "1px solid #fca5a5" : "1px solid #d1d5db",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    fontSize: "1rem",
    color: "#1f2937",
    direction: isRTL ? "rtl" : "ltr",
  }}

  buttonStyle={{
    border: "none",
    borderRadius: isRTL ? "0 12px 12px 0" : "12px 0 0 12px",
    height: "48px",
    top: "0px",
    [isRTL ? "right" : "left"]: "0px",
    [isRTL ? "left" : "right"]: "auto",
  }}

  containerStyle={{
    width: "100%",
    direction: isRTL ? "rtl" : "ltr",
  }}

  dropdownStyle={{
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    zIndex: 50,
    textAlign: isRTL ? "right" : "left",
    [isRTL ? "right" : "left"]: 0,
    [isRTL ? "left" : "right"]: "auto",
  }}

  placeholder={t("contact.form.phone.placeholder")}
  disableDropdown={false}
  enableSearch={true}
/>

                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                  

                  {/* Email */}
                  <div className="relative w-full">
                    <label className="block text-gray-700 mb-2 font-medium">
                      {t("contact.form.email.label")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`appearance-none w-full bg-white border rounded-xl px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800 transition ${
                        errors.email
                          ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                          : "border-gray-300"
                      }`}
                      placeholder={t("contact.form.email.placeholder")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Service */}
                  <div className="relative w-full">
                    <label className="block text-gray-700 mb-2 font-medium">
                      {t("contact.form.service.label")} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className={`appearance-none w-full bg-white border rounded-xl px-5 py-3 pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800 cursor-pointer transition ${
                          errors.service
                            ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">{t("contact.form.service.label")}</option>
{(t("contact.form.service.options", { returnObjects: true }) as string[]).map(
  (opt, i) => (
    <option key={i} value={opt}>
      {opt}
    </option>
  )
)}

                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.service && (
                      <p className="text-red-500 text-sm mt-1">{errors.service}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="relative w-full">
                    <label className="block text-gray-700 mb-2 font-medium">
                      {t("contact.form.message.label")} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className={`appearance-none w-full bg-white border rounded-xl px-5 py-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800 transition resize-none ${
                        errors.message
                          ? "border-red-300 focus:ring-red-400 focus:border-red-400"
                          : "border-gray-300"
                      }`}
                      placeholder={t("contact.form.message.placeholder")}
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#42A5E1] text-white py-4 rounded-xl hover:bg-[#1e88e5] disabled:bg-gray-400 disabled:cursor-not-allowed transition font-semibold text-lg shadow-md flex items-center justify-center gap-2"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> {t("contact.form.sending")}
                      </>
                    ) : (
                      t("contact.form.submit")
                    )}
                  </motion.button>
                </form>


              </div>


              
            </motion.div>
          </div>
        </section>
      </div>

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}
