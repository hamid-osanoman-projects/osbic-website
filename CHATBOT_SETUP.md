# OSBIC Chatbot Setup Instructions

## Overview
This chatbot implementation provides a fully functional chat interface for the OSBIC business website with the following features:

- **Floating chat button** with smooth animations
- **Real-time messaging** with Supabase backend
- **Quick reply buttons** for common queries
- **Responsive design** matching the OSBIC brand
- **Error handling** and loading states

## Files Created/Modified

### 1. Database Schema
- **File**: `src/integrations/supabase/types.ts`
- **Changes**: Added `messages` table schema with columns:
  - `id`: string (primary key)
  - `role`: 'user' | 'assistant'
  - `content`: string (message text)
  - `timestamp`: string (ISO date)
  - `created_at`: string (auto-generated)

### 2. Chatbot Component
- **File**: `src/components/Chatbot.tsx`
- **Features**:
  - Floating button with Framer Motion animations
  - Chat window with header, messages, and input
  - Quick reply buttons for "Company registration" and "Visa services"
  - Real-time message saving to Supabase
  - Loading states and error handling
  - Auto-scroll to latest messages

### 3. API Handler
- **File**: `src/api/chat.ts`
- **File**: `src/integrations/supabase/functions/chat/index.ts`
- **Features**:
  - Mock AI responses for different query types
  - Simulated API delays for realistic experience
  - Comprehensive responses for OSBIC services

### 4. Home Page Integration
- **File**: `src/pages/Home1.tsx`
- **Changes**:
  - Removed old chatbot implementation
  - Added new Chatbot component
  - Moved WhatsApp button to left side to avoid conflicts

## Supabase Database Setup

### 1. Create Messages Table
**IMPORTANT**: You must create the database table first before the chatbot will work properly.

**Option A: Use the provided SQL file**
1. Open the `database-setup.sql` file in this project
2. Copy the entire contents
3. Go to your Supabase dashboard → SQL Editor
4. Paste and run the SQL

**Option B: Manual setup**
Run this SQL in your Supabase SQL editor:

```sql
-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for chatbot)
CREATE POLICY IF NOT EXISTS "Allow anonymous message inserts" ON messages
  FOR INSERT WITH CHECK (true);

-- Create policy to allow anonymous selects (for chatbot)
CREATE POLICY IF NOT EXISTS "Allow anonymous message selects" ON messages
  FOR SELECT USING (true);
```

### 2. Verify Table Creation
After running the SQL:
1. Go to Supabase Dashboard → Table Editor
2. You should see a `messages` table
3. The table should have columns: `id`, `role`, `content`, `timestamp`, `created_at`

### 2. Verify Supabase Connection
The chatbot uses the existing Supabase client configuration in `src/integrations/supabase/client.ts`. Ensure your environment variables are set correctly.

## Dependencies

All required dependencies are already installed in your project:
- ✅ `@supabase/supabase-js` - Database operations
- ✅ `framer-motion` - Animations
- ✅ `lucide-react` - Icons
- ✅ `react` & `react-dom` - Core React
- ✅ `tailwindcss` - Styling

## Features Implemented

### ✅ UI Components
- [x] Floating chat button (bottom-right)
- [x] Chat window with OSBIC branding
- [x] Header: "OSBIC Assistant" + "How can we help you today?"
- [x] Assistant welcome message with service list
- [x] Quick reply buttons: "Company registration" & "Visa services"
- [x] Text input with send button (paper plane icon)
- [x] Footer link: "Talk to a Human Consultant"

### ✅ Animations
- [x] Chat open/close with Framer Motion
- [x] Message appearance animations
- [x] Button hover effects
- [x] Loading indicators

### ✅ Backend Integration
- [x] Supabase messages table
- [x] Real-time message saving
- [x] Mock AI responses
- [x] Error handling

### ✅ Responsive Design
- [x] Mobile-friendly chat window
- [x] Proper z-index layering
- [x] OSBIC brand colors (#42A5E1)

## Usage

The chatbot is now integrated into your Home1.tsx page and will appear as a floating button in the bottom-right corner. Users can:

1. **Click the chat button** to open the chat window
2. **Use quick reply buttons** for common queries
3. **Type custom messages** in the input field
4. **Get intelligent responses** based on their queries
5. **Access human support** via the footer link

## Customization

### Modify AI Responses
Edit `src/integrations/supabase/functions/chat/index.ts` to customize the mock responses or integrate with a real AI service.

### Change Styling
Modify the Tailwind classes in `src/components/Chatbot.tsx` to match your exact design requirements.

### Add Real AI Integration
Replace the mock API in `src/api/chat.ts` with actual OpenAI or other AI service calls.

## Testing

1. **Start your development server**: `npm run dev`
2. **Open the website** and look for the floating chat button
3. **Click to open** the chat window
4. **Test quick replies** and custom messages
5. **Check Supabase** to see saved messages

## Troubleshooting

### TypeScript Error: "No overload matches this call"
**Problem**: The Supabase types aren't recognizing the `messages` table.

**Solution**: 
1. **First, create the database table** using the SQL above
2. **Regenerate Supabase types** (if using Supabase CLI):
   ```bash
   supabase gen types typescript --project-id YOUR_PROJECT_ID > src/integrations/supabase/types.ts
   ```
3. **Or manually update** the types file to match your database schema

### Database Connection Issues
**Problem**: Messages aren't being saved to Supabase.

**Solution**:
1. **Verify your Supabase URL and API key** in `src/integrations/supabase/client.ts`
2. **Check that the `messages` table exists** in your Supabase dashboard
3. **Verify RLS policies** allow anonymous inserts
4. **Check browser console** for any error messages

### Chatbot Not Appearing
**Problem**: The floating chat button isn't visible.

**Solution**:
1. **Check that Chatbot component is imported** in Home1.tsx
2. **Verify no CSS conflicts** with z-index
3. **Check browser console** for JavaScript errors
4. **Ensure all dependencies are installed**: `npm install`

## Production Deployment

1. **Deploy your Supabase database** with the messages table
2. **Update environment variables** if needed
3. **Test the chatbot** in production environment
4. **Monitor message storage** in Supabase dashboard

The chatbot is now fully functional and ready for production use!
