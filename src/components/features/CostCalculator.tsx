// components/CostCalculator.tsx
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface CostCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyfvrNRR-t6Z1BanJvYG9WBadUxAjzKuBmekRlaSyMHQmAEi9JqxQS5cJ4LvDD1H7QF/exec";
const WEB_APP_TOKEN = "osbic";
const USE_NO_CORS = true;

const CostCalculator = ({ open, onOpenChange }: CostCalculatorProps) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    country: "",
    businessType: "",
    shareholders: "",
    visas: "",
    capital: "",
    employees: "",
    businessActivity: "",
    industryCategory: "",
    timeline: "",
    urgency: "",
    officeRequired: "",
    localSponsor: "",
    shareholderAgreement: "",
    haveBankAccount: "",
    needVisaProcessing: "",
    addOns: [] as string[],
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  // ------------------------------------------
  // STEP LABELS (multilingual)
  // ------------------------------------------
  const steps = t("calculator.steps", { returnObjects: true }) as string[];

  const updateFormData = (field: string, value: any) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  // ------------------------------------------
  // VALIDATION with translation
  // ------------------------------------------
  const validateStep = (s = step) => {
    // const err = t("calculator.errors");
    const err = t("calculator.errors", { returnObjects: true }) as Record<string, string>;


    switch (s) {
      case 1:
        if (!formData.country || !formData.businessType) {
          toast.error(err.countryType);
          return false;
        }
        return true;

      case 2:
        if (!formData.shareholders || !formData.visas || !formData.businessActivity) {
          toast.error(err.shareholdersVisasActivity);
          return false;
        }
        return true;

      case 3:
        if (!formData.industryCategory || !formData.timeline) {
          toast.error(err.industryTimeline);
          return false;
        }
        return true;

      case 4:
        if (formData.country === "Oman" && !formData.localSponsor) {
          toast.error(err.omanSponsor);
          return false;
        }
        if (parseInt(formData.shareholders || "0") > 1 && !formData.shareholderAgreement) {
          toast.error(err.shareholderAgreement);
          return false;
        }
        if (!formData.officeRequired) {
          toast.error(err.officeRequired);
          return false;
        }
        return true;

      case 5:
        if (
          formData.addOns.includes("Bank Account Assistance") &&
          !formData.haveBankAccount
        ) {
          toast.error(err.bankAccount);
          return false;
        }
        if (
          formData.addOns.includes("PRO Services") &&
          !formData.needVisaProcessing
        ) {
          toast.error(err.visaProcessing);
          return false;
        }
        return true;

      case 6:
        if (!formData.name || !formData.email || !formData.phone) {
          toast.error(err.contactDetails);
          return false;
        }
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
          toast.error(err.emailInvalid);
          return false;
        }
        return true;

      case 7:
        for (let i = 1; i <= 6; i++) {
          if (!validateStep(i)) return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNext = () =>
    validateStep() && setStep((p) => Math.min(p + 1, steps.length));

  const handleBack = () => setStep((p) => Math.max(p - 1, 1));

  const handleClose = () => {
    setStep(1);
    setSuccess(false);
    setFormData({
      country: "",
      businessType: "",
      shareholders: "",
      visas: "",
      capital: "",
      employees: "",
      businessActivity: "",
      industryCategory: "",
      timeline: "",
      urgency: "",
      officeRequired: "",
      localSponsor: "",
      shareholderAgreement: "",
      haveBankAccount: "",
      needVisaProcessing: "",
      addOns: [],
      name: "",
      email: "",
      phone: "",
      notes: "",
    });
    onOpenChange(false);
  };

  // ------------------------------------------
  // SUBMIT HANDLER
  // ------------------------------------------
  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsSubmitting(true);

    const payload = {
      ...formData,
      timestamp: new Date().toISOString(),
      processed: "Pending",
      _token: WEB_APP_TOKEN,
    };

    try {
      if (USE_NO_CORS) {
        await fetch(WEB_APP_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" } as any,
          body: JSON.stringify(payload),
        });
        toast.success(t("calculator.errors.submissionNoCors"));
        setSuccess(true);
      } else {
        const res = await fetch(WEB_APP_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-webhook-token": WEB_APP_TOKEN,
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(`Server error ${res.status}`);

        const json = await res.json();
        if (json.status === "success") {
          toast.success(t("calculator.errors.submissionSuccess"));
          setSuccess(true);
        } else {
          throw new Error(json.message || "Error");
        }
      }
    } catch {
      toast.error(t("calculator.errors.submissionFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  const progress = ((step - 1) / (steps.length - 1)) * 100;
  const opts = t("calculator.options", { returnObjects: true }) as any;
  const labels = t("calculator.stepLabels", { returnObjects: true }) as any;
  const ph = t("calculator.placeholders", { returnObjects: true }) as any;
  const buttons = t("calculator.buttons", { returnObjects: true }) as any;
  const successText = t("calculator.success", { returnObjects: true }) as any;

  const showOmanSponsor = formData.country === "Oman";
  const needShareholderAgreement =
    parseInt(formData.shareholders || "0") > 1;

  return (
    <AnimatePresence>
      <motion.div
        dir="ltr"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white w-full sm:w-[500px] md:w-[700px] max-h-[90vh] rounded-2xl shadow-2xl relative overflow-hidden flex flex-col"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
        >
          {/* CLOSE BUTTON */}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold z-10"
            onClick={handleClose}
          >
            ✕
          </button>

          {!success ? (
            <>
              {/* HEADER */}
              <div className="p-4 sm:p-6 bg-blue-50 border-b">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 text-gray-800">
                  {/* <Calculator className="w-5 h-5 text-blue-500" /> */}
                  {t("calculator.title")}
                </h2>
              </div>

              {/* STEP INDICATOR */}
              <div className="p-4 sm:px-6 flex flex-col gap-2">
                <div className="flex items-center justify-between mb-1">
                  {steps.map((label, i) => (
                    <div key={i} className="flex flex-col items-center flex-1 min-w-0">
                      <div
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-white font-medium ${
                          step === i + 1
                            ? "bg-blue-500"
                            : step > i + 1
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span className="text-[9px] sm:text-xs text-gray-600 text-center">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="h-1 sm:h-2 w-full bg-gray-200 rounded-full">
                  <motion.div
                    className="h-1 sm:h-2 bg-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.35 }}
                  />
                </div>
              </div>

              {/* CONTENT AREA */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {/* ------------------------------------------
                    STEP 1
                ------------------------------------------- */}
                {step === 1 && (
                  <div className="space-y-4">
                    {/* Country */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">
                        {labels.country}
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) =>
                          updateFormData("country", e.target.value)
                        }
                        className="w-full border px-4 py-2 rounded-xl"
                      >
                        <option value="">{ph.selectCountry}</option>
                        {opts.countries.map((c: string) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Business Type */}
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">
                        {labels.businessType}
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) =>
                          updateFormData("businessType", e.target.value)
                        }
                        className="w-full border px-4 py-2 rounded-xl"
                      >
                        <option value="">{ph.selectType}</option>
                        {opts.businessTypes.map((type: string) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------
                    STEP 2
                ------------------------------------------- */}
                {step === 2 && (
                  <div className="space-y-4">
                    {/* Shareholders */}
                    <div>
                      <label className="block mb-1 text-gray-700">
                        {labels.shareholders}
                      </label>
                      <input
                        type="number"
                        min={1}
                        placeholder={ph.shareholders}
                        value={formData.shareholders}
                        onChange={(e) =>
                          updateFormData("shareholders", e.target.value)
                        }
                        className="w-full border px-4 py-2 rounded-xl"
                      />
                      <p className="text-xs text-gray-500">
                        {labels.shareholdersHint}
                      </p>
                    </div>

                    {/* Visas */}
                    <div>
                      <label className="block mb-1 text-gray-700">
                        {labels.visas}
                      </label>
                      <input
                        type="number"
                        min={0}
                        placeholder={ph.visas}
                        value={formData.visas}
                        onChange={(e) =>
                          updateFormData("visas", e.target.value)
                        }
                        className="w-full border px-4 py-2 rounded-xl"
                      />
                    </div>

                    {/* Activity */}
                    <div>
                      <label className="block mb-1 text-gray-700">
                        {labels.businessActivity}
                      </label>
                      <input
                        type="text"
                        placeholder={ph.businessActivity}
                        value={formData.businessActivity}
                        onChange={(e) =>
                          updateFormData("businessActivity", e.target.value)
                        }
                        className="w-full border px-4 py-2 rounded-xl"
                      />
                    </div>

                    {/* Capital + Employees */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 text-gray-700">
                          {labels.capital}
                        </label>
                        <input
                          type="number"
                          placeholder={ph.capital}
                          value={formData.capital}
                          onChange={(e) =>
                            updateFormData("capital", e.target.value)
                          }
                          className="w-full border px-4 py-2 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-gray-700">
                          {labels.employees}
                        </label>
                        <input
                          type="number"
                          placeholder={ph.employees}
                          value={formData.employees}
                          onChange={(e) =>
                            updateFormData("employees", e.target.value)
                          }
                          className="w-full border px-4 py-2 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------
                    STEP 3
                ------------------------------------------- */}
                {step === 3 && (
                  <div className="space-y-4">
                    {/* Industry */}
                    <div>
                      <label className="block mb-1">{labels.industryCategory}</label>
                      <select
                        value={formData.industryCategory}
                        onChange={(e) =>
                          updateFormData("industryCategory", e.target.value)
                        }
                        className="w-full border px-4 py-2 rounded-xl"
                      >
                        <option value="">{ph.selectType}</option>
                        {opts.industries.map((i: string) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Timeline */}
                    <div>
                      <label className="block mb-1">{labels.timeline}</label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => updateFormData("timeline", e.target.value)}
                        className="w-full border px-4 py-2 rounded-xl"
                      >
                        <option value="">Select</option>
                        {opts.timelines.map((t: string) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Urgency */}
                    <div>
                      <label className="block mb-1">{labels.urgency}</label>
                      <select
                        value={formData.urgency}
                        onChange={(e) =>
                          updateFormData("urgency", e.target.value)
                        }
                        className="w-full border px-4 py-2 rounded-xl"
                      >
                        <option value="">Select</option>
                        {opts.urgency.map((u: string) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500">{labels.urgencyHint}</p>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------
                    STEP 4
                ------------------------------------------- */}
                {step === 4 && (
                  <div className="space-y-4">
                    {/* Sponsor (Oman only) */}
                    {showOmanSponsor && (
                      <div>
                        <label className="block mb-1">{labels.localSponsor}</label>
                        <select
                          value={formData.localSponsor}
                          onChange={(e) =>
                            updateFormData("localSponsor", e.target.value)
                          }
                          className="w-full border px-4 py-2 rounded-xl"
                        >
                          <option value="">Select</option>
                          {opts.yesNo.map((v: string) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Shareholder Agreement */}
                    {needShareholderAgreement && (
                      <div>
                        <label className="block mb-1">
                          {labels.shareholderAgreement}
                        </label>
                        <select
                          value={formData.shareholderAgreement}
                          onChange={(e) =>
                            updateFormData("shareholderAgreement", e.target.value)
                          }
                          className="w-full border px-4 py-2 rounded-xl"
                        >
                          <option value="">Select</option>
                          {opts.yesNo.map((v: string) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Office Requirement */}
                    <div>
                      <label className="block mb-1">{labels.officeRequired}</label>
                      <select
                        value={formData.officeRequired}
                        onChange={(e) =>
                          updateFormData("officeRequired", e.target.value)
                        }
                        className="w-full border px-4 py-2 rounded-xl"
                      >
                        <option value="">Select</option>
                        {opts.office.map((o: string) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------
                    STEP 5
                ------------------------------------------- */}
                {step === 5 && (
                  <div className="space-y-4">
                    <label className="block mb-2 font-medium">
                      {labels.addOns}
                    </label>

                    <div className="flex flex-wrap gap-3">
                      {opts.addOns.map((addon: string) => (
                        <label
                          key={addon}
                          className="flex items-center gap-2 cursor-pointer border rounded-xl px-3 py-2"
                        >
                          <input
                            type="checkbox"
                            checked={formData.addOns.includes(addon)}
                            onChange={(e) => {
                              const updated = e.target.checked
                                ? [...formData.addOns, addon]
                                : formData.addOns.filter((a) => a !== addon);
                              updateFormData("addOns", updated);
                            }}
                            className="accent-blue-500 w-4 h-4"
                          />
                          <span>{addon}</span>
                        </label>
                      ))}
                    </div>

                    {/* Bank Account */}
                    {formData.addOns.includes("Bank Account Assistance") && (
                      <div>
                        <label className="block mb-1">{labels.haveBankAccount}</label>
                        <select
                          value={formData.haveBankAccount}
                          onChange={(e) =>
                            updateFormData("haveBankAccount", e.target.value)
                          }
                          className="w-full border px-4 py-2 rounded-xl"
                        >
                          <option value="">Select</option>
                          {opts.yesNo.map((v: string) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Visa Processing */}
                    {formData.addOns.includes("PRO Services") && (
                      <div>
                        <label className="block mb-1">
                          {labels.needVisaProcessing}
                        </label>
                        <select
                          value={formData.needVisaProcessing}
                          onChange={(e) =>
                            updateFormData("needVisaProcessing", e.target.value)
                          }
                          className="w-full border px-4 py-2 rounded-xl"
                        >
                          <option value="">Select</option>
                          {opts.yesNo.map((v: string) => (
                            <option key={v} value={v}>
                              {v}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                )}

                {/* ------------------------------------------
                    STEP 6 — Contact Info
                ------------------------------------------- */}
                {step === 6 && (
                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block mb-1">{labels.name}</label>
                      <input
                        type="text"
                        placeholder={ph.name}
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        className="w-full border px-4 py-2 rounded-xl"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block mb-1">{labels.email}</label>
                      <input
                        type="email"
                        placeholder={ph.email}
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        className="w-full border px-4 py-2 rounded-xl"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block mb-1">{labels.phone}</label>
                      <PhoneInput
                        country={"om"}
                        onlyCountries={["om", "ae", "sa", "qa", "bh", "kw", "in"]}
                        value={formData.phone}
                        onChange={(phone) => updateFormData("phone", phone)}
                        inputClass="!w-full !h-[44px] !pl-14 !pr-4 !border !border-gray-300 !rounded-xl"
                        containerClass="!w-full"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block mb-1">{labels.notes}</label>
                      <textarea
                        rows={3}
                        placeholder={ph.notes}
                        value={formData.notes}
                        onChange={(e) =>
                          updateFormData("notes", e.target.value)
                        }
                        className="w-full border px-4 py-2 rounded-xl"
                      />
                    </div>
                  </div>
                )}

                {/* ------------------------------------------
                    STEP 7 — Review
                ------------------------------------------- */}
                {step === 7 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{t("calculator.steps.6")}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(formData).map(([key, val]) => (
                        <div key={key} className="p-3 border rounded-lg">
                          <div className="text-xs text-gray-500">
                            {labels[key] || key}
                          </div>
                          <div className="text-sm text-gray-800">
                            {Array.isArray(val) ? val.join(", ") || "—" : val || "—"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* FOOTER BUTTONS */}
              <div className="bg-white border-t p-4 flex justify-between items-center">
                {/* BACK */}
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
                >
                  {buttons.back}
                </button>

                {/* NEXT / SUBMIT */}
                {step < steps.length ? (
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                  >
                    {buttons.next}
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
                  >
                    {isSubmitting ? buttons.submitting : buttons.submit}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-10 space-y-4">
              <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
              <h3 className="text-xl font-semibold">{successText.title}</h3>
              <p className="text-gray-600">{successText.message}</p>
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-gray-200 rounded-lg"
              >
                {buttons.close}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CostCalculator;
