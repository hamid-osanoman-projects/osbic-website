// components/CostCalculator.tsx
import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";

interface CostCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void; 
}

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyfvrNRR-t6Z1BanJvYG9WBadUxAjzKuBmekRlaSyMHQmAEi9JqxQS5cJ4LvDD1H7QF/exec";
const WEB_APP_TOKEN = "osbic";
const USE_NO_CORS = true;

const CostCalculator = ({ open, onOpenChange }: CostCalculatorProps) => {
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
    accounting: "",
    websiteBranding: "",
    addOns: [] as string[],
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const steps = [
    { label: "Country & Type" },
    { label: "Business Details" },
    { label: "Industry & Timeline" },
    { label: "Legal & Office" },
    { label: "Add-ons & Services" },
    { label: "Contact & Info " },
    { label: "Review Details" },
  ];

  const updateFormData = (field: string, value: string | string[]) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const validateStep = (s = step) => {
    switch (s) {
      case 1:
        if (!formData.country || !formData.businessType) {
          toast.error("Please select a country and business type.");
          return false;
        }
        return true;
      case 2:
        if (!formData.shareholders || !formData.visas || !formData.businessActivity) {
          toast.error("Please complete shareholders, visas and business activity.");
          return false;
        }
        return true;
      case 3:
        if (!formData.industryCategory || !formData.timeline) {
          toast.error("Please select industry category and timeline.");
          return false;
        }
        return true;
      case 4:
        if (formData.country === "Oman" && !formData.localSponsor) {
          toast.error("Please indicate if you need a local sponsor in Oman.");
          return false;
        }
        if (parseInt(formData.shareholders || "0") > 1 && !formData.shareholderAgreement) {
          toast.error("Please indicate whether you need a shareholder agreement.");
          return false;
        }
        if (!formData.officeRequired) {
          toast.error("Please indicate office setup requirement.");
          return false;
        }
        return true;
      case 5:
        if (formData.addOns.includes("Bank Account Assistance") && !formData.haveBankAccount) {
          toast.error("Please indicate whether you already have a corporate bank account.");
          return false;
        }
        if (formData.addOns.includes("PRO Services") && !formData.needVisaProcessing) {
          toast.error("Please indicate whether you need visa processing.");
          return false;
        }
        return true;
      case 6:
        if (!formData.name || !formData.email || !formData.phone) {
          toast.error("Please fill in your contact details.");
          return false;
        }
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
          toast.error("Please enter a valid email address.");
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

  const handleNext = () => validateStep() && setStep((p) => Math.min(p + 1, steps.length));
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
      accounting: "",
      websiteBranding: "",
      addOns: [],
      name: "",
      email: "",
      phone: "",
      notes: "",
    });
    onOpenChange(false);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsSubmitting(true);

    // const payload = { ...formData, timestamp: new Date().toISOString(), _token: WEB_APP_TOKEN };
    const payload = { 
  ...formData,
  timestamp: new Date().toISOString(),
  processed: "Pending",   // ✅ default status
  _token: WEB_APP_TOKEN
};


    try {
      if (USE_NO_CORS) {
        await fetch(WEB_APP_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" } as any,
          body: JSON.stringify(payload),
        });
        toast.success("Estimate submitted. We'll contact you.");
        setSuccess(true);
      } else {
        const res = await fetch(WEB_APP_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-webhook-token": WEB_APP_TOKEN },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(`Server error ${res.status}`);
        const json = await res.json();
        if (json.status === "success") {
          toast.success("Estimate submitted successfully!");
          setSuccess(true);
        } else throw new Error(json.message || "Submission failed");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  const progress = ((step - 1) / (steps.length - 1)) * 100;
  const showOmanSponsor = formData.country === "Oman";
  const needShareholderAgreement = parseInt(formData.shareholders || "0") > 1;

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
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold z-10"
            onClick={handleClose}
            aria-label="Close"
          >
            ✕
          </button>

          {!success ? (
            <>
              {/* Header */}
              <div className="p-4 sm:p-6 bg-blue-50 border-b">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center gap-2 sm:gap-3 text-gray-800">
                  <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                  Get Instant Quote
                </h2>
              </div>

              {/* Step indicator */}
              <div className="p-4 sm:px-6 flex flex-col gap-2">
                <div className="flex items-center justify-between mb-1">
                  {steps.map((s, i) => (
                    // <div key={i} className="flex flex-col items-center w-1/7">
                    <div key={i} className="flex flex-col items-center flex-1 min-w-0">

                      <div
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-white font-medium transition ${
                          step === i + 1 ? "bg-blue-500 shadow-md" : step > i + 1 ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span className="text-[9px] sm:text-xs text-gray-600 text-center">{s.label}</span>
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

              {/* Content area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                {/* All step content goes here */}
                {/* Reduce font size and input padding for mobile */}
                {/* Example STEP 1 */}
                {step === 1 && (
                  <motion.div key="s1" className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Country</label>
                      <select
                        value={formData.country}
                        onChange={(e) => updateFormData("country", e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 sm:px-4 sm:py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm text-sm sm:text-base"
                      >
                        <option value="">Select Country</option>
                        <option value="Oman">Oman</option>
                        <option value="UAE">UAE</option>
                        <option value="Saudi">Saudi Arabia</option>
                        <option value="Qatar">Qatar</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Business Type</label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => updateFormData("businessType", e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 sm:px-4 sm:py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm text-sm sm:text-base"
                      >
                        <option value="">Select Type</option>
                        <option value="LLC">LLC</option>
                        <option value="Free Zone">Free Zone</option>
                        <option value="Branch">Branch</option>
                        <option value="Offshore">Offshore</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                 {/* STEP 2 */}
                 {step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-4">
                      <div>
                        <label className="block mb-1 font-medium text-gray-700">Number of Shareholders</label>
                        <input type="number" min={1} placeholder="1" value={formData.shareholders} onChange={(e) => updateFormData("shareholders", e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm" />
                        <p className="text-xs text-gray-500 mt-1">If more than 1, we may recommend shareholder agreement/legal docs.</p>
                      </div>

                      <div>
                        <label className="block mb-1 font-medium text-gray-700">Number of Visas Required</label>
                        <input type="number" min={0} placeholder="0" value={formData.visas} onChange={(e) => updateFormData("visas", e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm" />
                      </div>

                      <div>
                        <label className="block mb-1 font-medium text-gray-700">Primary Business Activity</label>
                        <input type="text" placeholder="Trading, Services, Tech..." value={formData.businessActivity} onChange={(e) => updateFormData("businessActivity", e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1 font-medium text-gray-700">Approx. Capital (USD)</label>
                          <input type="number" placeholder="5000" value={formData.capital} onChange={(e) => updateFormData("capital", e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm" />
                        </div>
                        <div>
                          <label className="block mb-1 font-medium text-gray-700">Estimated Employees</label>
                          <input type="number" placeholder="0" value={formData.employees} onChange={(e) => updateFormData("employees", e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <motion.div key="s3" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-4">
                      <div>
                        <label className="block mb-1 font-medium text-gray-700">Industry Category</label>
                        <select value={formData.industryCategory} onChange={(e) => updateFormData("industryCategory", e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm">
                          <option value="">Select Industry</option>
                          <option value="Trading">Trading</option>
                          <option value="Services">Services</option>
                          <option value="Tech">Tech / Software</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Consulting">Consulting</option>
                        </select>
                      </div>

                      <div>
                        <label className="block mb-1 font-medium text-gray-700">Planned Start Timeline</label>
                        <select value={formData.timeline} onChange={(e) => updateFormData("timeline", e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm">
                          <option value="">Select</option>
                          <option value="Immediately">Immediately</option>
                          <option value="Within a month">Within a month</option>
                          <option value="1-3 months">1-3 months</option>
                          <option value="3+ months">3+ months</option>
                        </select>
                      </div>

                      <div>
                        <label className="block mb-1 font-medium text-gray-700">Urgency</label>
                        <select value={formData.urgency} onChange={(e) => updateFormData("urgency", e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm">
                          <option value="">Select</option>
                          <option value="Normal">Normal</option>
                          <option value="Expedited (+fees)">Expedited</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Expedited processing can incur extra fees.</p>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4 */}
                  {step === 4 && (
                    <motion.div key="s4" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-4">
                      {showOmanSponsor && (
                        <div>
                          <label className="block mb-1 font-medium text-gray-700">Local Sponsor Required?</label>
                          <select value={formData.localSponsor} onChange={(e) => updateFormData("localSponsor", e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm">
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                          <p className="text-xs text-gray-500 mt-1">For Oman: many company types require a local sponsor/agent.</p>
                        </div>
                      )}

                      {needShareholderAgreement && (
                        <div>
                          <label className="block mb-1 font-medium text-gray-700">Do you need a shareholder agreement?</label>
                          <select value={formData.shareholderAgreement} onChange={(e) => updateFormData("shareholderAgreement", e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm">
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      )}

                      <div>
                        <label className="block mb-1 font-medium text-gray-700">Office Setup Required?</label>
                        <select value={formData.officeRequired} onChange={(e) => updateFormData("officeRequired", e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm">
                          <option value="">Select</option>
                          <option value="Yes">Yes — physical office</option>
                          <option value="Serviced">Serviced / virtual office</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5 */}
                  {step === 5 && (
                    <motion.div key="s5" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-4">
                      <label className="block mb-2 font-medium text-gray-700">Add-ons & Services</label>
                      <div className="flex flex-wrap gap-3">
                        {["PRO Services", "Office Space Setup", "Bank Account Assistance", "Accounting / Bookkeeping", "Website / Branding"].map((addon) => (
                          <label key={addon} className="flex items-center gap-2 cursor-pointer border rounded-xl px-3 py-2">
                            <input type="checkbox" checked={formData.addOns.includes(addon)} onChange={(e) => {
                              const newAddOns = e.target.checked ? [...formData.addOns, addon] : formData.addOns.filter((a) => a !== addon);
                              updateFormData("addOns", newAddOns);
                            }} className="accent-blue-500 w-4 h-4" />
                            <span className="text-gray-700 font-medium">{addon}</span>
                          </label>
                        ))}
                      </div>

                      {formData.addOns.includes("Bank Account Assistance") && (
                        <div>
                          <label className="block mb-1 font-medium text-gray-700">Do you already have a corporate bank account?</label>
                          <select value={formData.haveBankAccount} onChange={(e) => updateFormData("haveBankAccount", e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm">
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      )}

                      {formData.addOns.includes("PRO Services") && (
                        <div>
                          <label className="block mb-1 font-medium text-gray-700">Do you need visa processing for employees?</label>
                          <select value={formData.needVisaProcessing} onChange={(e) => updateFormData("needVisaProcessing", e.target.value)} className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm">
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* STEP 6 */}
                  {step === 6 && (
  <motion.div
    key="s6"
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -40 }}
    className="space-y-4"
  >
    {/* Full Name */}
    <div>
      <label className="block mb-1 font-medium text-gray-700">Full Name</label>
      <input
        type="text"
        placeholder="John Doe"
        value={formData.name}
        onChange={(e) => updateFormData("name", e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
      />
    </div>

    {/* Email */}
    <div>
      <label className="block mb-1 font-medium text-gray-700">Email</label>
      <input
        type="email"
        placeholder="john@example.com"
        value={formData.email}
        onChange={(e) => updateFormData("email", e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
      />
    </div>

    {/* Phone */}
    <div>
  <label className="block mb-1 font-medium text-gray-700">Phone</label>
  <div className="w-full">
    <PhoneInput
      country={"om"}
      onlyCountries={["om", "ae", "sa", "qa", "bh", "kw", "in"]}
      value={formData.phone}
      onChange={(phone) => updateFormData("phone", phone)}
      inputClass="!w-full !h-[44px] !pl-14 !pr-4 !border !border-gray-300 !rounded-xl !focus:ring-2 !focus:ring-blue-400 !focus:border-blue-400 !transition !shadow-sm !text-gray-700"
      containerClass="!w-full"
      buttonClass="!absolute !left-0 !top-0 !bottom-0 !rounded-l-xl !border-none !bg-transparent !pl-3"
      dropdownClass="!rounded-xl !shadow-lg"
    />
  </div>
</div>


    {/* Notes */}
    <div>
      <label className="block mb-1 font-medium text-gray-700">Notes (optional)</label>
      <textarea
        rows={3}
        value={formData.notes}
        onChange={(e) => updateFormData("notes", e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
        placeholder="Any extra info..."
      />
    </div>
  </motion.div>
                  )}

                  {/* STEP 7 — Review */}
                  {step === 7 && (
                    <motion.div key="s7" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="space-y-4">
                      <h3 className="text-lg font-medium">Review your details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(formData).map(([k, v]) => (
                          <div key={k} className="p-3 border rounded-lg">
                            <div className="text-xs text-gray-500">{k}</div>
                            <div className="text-sm text-gray-800">{Array.isArray(v) ? (v.length ? v.join(", ") : "—") : v || "—"}</div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500">Click submit to send this to our team — we will follow up with an estimate.</p>
                    </motion.div>
                  )}

              </div>

              {/* Sticky footer */}
              <div className="bg-white border-t p-4 sm:p-6 flex justify-between items-center">
                <button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" /> Back
                </button>
                {step < steps.length ? (
                  <button
                    onClick={handleNext}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
                  >
                    Next <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-1 sm:gap-2 disabled:opacity-50 text-sm sm:text-base"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Estimate"} <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <motion.div
              key="success"
              className="text-center py-10 space-y-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Thank you!</h3>
              <p className="text-gray-600 text-sm sm:text-base">We received your details — our team will reach out shortly.</p>
              <button onClick={handleClose} className="px-6 py-2 sm:px-8 sm:py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition text-sm sm:text-base">
                Close
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CostCalculator;
