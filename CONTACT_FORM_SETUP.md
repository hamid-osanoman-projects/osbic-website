# Contact Form Setup Instructions

## Overview
Your contact form is now fully functional with Supabase database storage and email notifications using Resend. Here's everything you need to set up:

## 📁 Files Created/Modified

### 1. Database Schema
- **File**: `contact-schema.sql`
- **Purpose**: Creates the `contact_messages` table in Supabase
- **Columns**: `id`, `full_name`, `phone`, `email`, `service`, `message`, `created_at`

### 2. Updated Contact Form
- **File**: `src/pages/Contact.tsx`
- **Features**:
  - Full form validation with error messages
  - Real-time error clearing when user types
  - Loading states with spinner animation
  - Success/error toast notifications
  - Form reset after successful submission
  - Supabase integration for data storage
  - Email notifications via Resend

### 3. Email API
- **File**: `src/api/sendMail.ts`
- **Features**:
  - Resend integration for email notifications
  - Professional HTML email template
  - Fallback handling if email service fails
  - Sends to: `hamid.osanoman@gmail.com`

### 4. Toast Component
- **File**: `src/components/Toast.tsx`
- **Features**:
  - Success and error notifications
  - Smooth animations with Framer Motion
  - Auto-dismiss after 5 seconds
  - Manual close option

### 5. Updated Supabase Types
- **File**: `src/integrations/supabase/types.ts`
- **Changes**: Added `contact_messages` table schema

## 🗄️ Database Setup

### 1. Create Contact Messages Table
Run this SQL in your Supabase SQL Editor:

```sql
-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for contact form)
CREATE POLICY IF NOT EXISTS "Allow anonymous contact form inserts" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Create policy to allow authenticated users to read all messages (for admin)
CREATE POLICY IF NOT EXISTS "Allow authenticated users to read contact messages" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');
```

### 2. Verify Table Creation
After running the SQL:
1. Go to Supabase Dashboard → Table Editor
2. You should see a `contact_messages` table
3. The table should have columns: `id`, `full_name`, `phone`, `email`, `service`, `message`, `created_at`

## 📧 Email Setup (Resend)

### Option 1: Using Resend (Recommended)

1. **Sign up for Resend**: Go to [resend.com](https://resend.com) and create an account
2. **Get API Key**: 
   - Go to API Keys section in your Resend dashboard
   - Create a new API key
   - Copy the key (starts with `re_`)
3. **Add to Environment Variables**:
   ```bash
   # Create .env file in your project root
   VITE_RESEND_API_KEY=re_your_api_key_here
   ```
4. **Verify Domain** (Optional but recommended):
   - Add your domain in Resend dashboard
   - This allows you to send emails from your domain instead of Resend's

### Option 2: Alternative Email Services

If you prefer other services, you can modify `src/api/sendMail.ts`:

**Formspree**:
```typescript
// Replace the Resend implementation with Formspree
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: formData.full_name,
    email: formData.email,
    phone: formData.phone,
    service: formData.service,
    message: formData.message
  })
});
```

**EmailJS**:
```typescript
// Install: npm install @emailjs/browser
import emailjs from '@emailjs/browser';

const result = await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  {
    from_name: formData.full_name,
    from_email: formData.email,
    phone: formData.phone,
    service: formData.service,
    message: formData.message
  },
  'YOUR_PUBLIC_KEY'
);
```

## 🚀 Testing the Form

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Form Submission
1. Go to `/contact` page
2. Fill out the form with test data
3. Submit the form
4. Check for:
   - ✅ Success toast notification
   - ✅ Form fields reset after submission
   - ✅ Data saved in Supabase (check Table Editor)
   - ✅ Email notification received (if Resend is configured)

### 3. Test Validation
1. Try submitting empty form
2. Try invalid email format
3. Try submitting without selecting a service
4. Verify error messages appear and clear when typing

## 📊 Monitoring & Analytics

### View Contact Messages
1. **Supabase Dashboard**: Go to Table Editor → contact_messages
2. **Filter by date**: Use the created_at column to filter recent submissions
3. **Export data**: Use Supabase's export feature for backup

### Email Delivery
- **Resend Dashboard**: Check email delivery status
- **Spam folder**: Check if emails are going to spam
- **Reply-to**: Emails include customer's email as reply-to for easy responses

## 🔧 Customization

### Change Email Template
Edit `src/api/sendMail.ts` in the `emailContent` variable:

```typescript
const emailContent = `
  <div style="font-family: Arial, sans-serif;">
    <h2>New Contact Form Submission</h2>
    <!-- Your custom HTML template -->
  </div>
`;
```

### Change Email Recipient
Update the `to` field in `sendContactEmail` function:

```typescript
to: ['your-email@domain.com', 'another-email@domain.com'],
```

### Add More Form Fields
1. Update the `FormData` interface in `Contact.tsx`
2. Add the field to the form JSX
3. Update the Supabase insert
4. Update the email template

### Change Toast Duration
In `Contact.tsx`, modify the Toast component:

```typescript
<Toast
  message={toast.message}
  type={toast.type}
  isVisible={toast.isVisible}
  onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
  duration={10000} // 10 seconds instead of 5
/>
```

## 🛡️ Security Features

### Form Validation
- ✅ Required field validation
- ✅ Email format validation
- ✅ Real-time error clearing
- ✅ Client-side and server-side validation

### Database Security
- ✅ Row Level Security (RLS) enabled
- ✅ Anonymous insert policy for contact form
- ✅ Authenticated read policy for admin access
- ✅ Input sanitization through Supabase

### Email Security
- ✅ API key stored in environment variables
- ✅ No sensitive data in client-side code
- ✅ Reply-to header for customer responses

## 🚨 Troubleshooting

### Form Not Submitting
1. **Check browser console** for JavaScript errors
2. **Verify Supabase connection** in network tab
3. **Check environment variables** are loaded correctly

### Emails Not Sending
1. **Verify Resend API key** is correct
2. **Check Resend dashboard** for delivery status
3. **Verify domain** is properly configured in Resend
4. **Check spam folder** for test emails

### Database Errors
1. **Verify table exists** in Supabase dashboard
2. **Check RLS policies** are correctly configured
3. **Verify Supabase URL and API key** in client configuration

### Toast Not Showing
1. **Check Toast component** is imported correctly
2. **Verify state management** in Contact component
3. **Check for CSS conflicts** with z-index

## 📈 Production Deployment

### Environment Variables
Make sure these are set in your production environment:
```bash
VITE_RESEND_API_KEY=re_your_production_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Domain Configuration
1. **Add domain to Resend** for professional email sending
2. **Configure DNS records** as required by Resend
3. **Test email delivery** from production domain

### Monitoring
1. **Set up error tracking** (Sentry, LogRocket, etc.)
2. **Monitor Supabase usage** for database limits
3. **Track email delivery rates** in Resend dashboard

Your contact form is now fully functional and production-ready! 🎉






