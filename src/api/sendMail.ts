// Email API using Resend

import { Resend } from "resend";
// @ts-ignore
const resend = new Resend(process.env.RESEND_API_KEY); // Put your Resend API key in .env


// This handles sending contact form notifications

interface ContactFormData {
  full_name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export const sendContactEmail = async (
    formData: ContactFormData
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // @ts-ignore
        if (process.env.NODE_ENV === "development") {
            console.log("📧 Dev mode email:", formData);
            return { success: true };
          }
          
      const response = await resend.emails.send({
        from: "your-email@example.com", // Must be verified in Resend
        to: "hamid.osanoman@gmail.com",
        subject: `New Contact Form Submission from ${formData.full_name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.full_name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Service:</strong> ${formData.service}</p>
          <p><strong>Message:</strong> ${formData.message}</p>
        `,
      });
  
      console.log('📧 Email sent successfully:', response);
  
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: 'Failed to send email notification' };
    }
  };
  

// Alternative: Simple email API without external service (for development)
export const sendContactEmailSimple = async (formData: ContactFormData): Promise<{ success: boolean; error?: string }> => {
  try {
    // This is a mock implementation for development
    // In production, you would use a real email service
    console.log('Contact form submission:', formData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true };
  } catch (error) {
    console.error('Error in simple email:', error);
    return { success: false, error: 'Failed to process email' };
  }
};

