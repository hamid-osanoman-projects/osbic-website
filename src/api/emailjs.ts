import emailjs from '@emailjs/browser';

interface ContactFormData {
  full_name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export const sendEmailJS = async (formData: ContactFormData) => {
  try {
    const serviceID = 'YOUR_SERVICE_ID';      // from EmailJS dashboard
    const templateID = 'YOUR_TEMPLATE_ID';    // from EmailJS dashboard
    const userID = 'YOUR_PUBLIC_KEY';         // from EmailJS dashboard

    const templateParams = {
      full_name: formData.full_name,
      phone: formData.phone,
      email: formData.email,
      service: formData.service,
      message: formData.message,
    };

    const response = await emailjs.send(serviceID, templateID, templateParams, userID);
    console.log('EmailJS success:', response.status, response.text);
    return { success: true };
  } catch (err: any) {
    console.error('EmailJS error:', err);
    return { success: false, error: err.text || 'Failed to send email' };
  }
};
