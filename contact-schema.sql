-- Contact Messages Table Schema
-- Run this SQL in your Supabase SQL Editor

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

-- Drop and recreate the policy to ensure it works
DROP POLICY IF EXISTS "Allow anonymous contact form inserts" ON contact_messages;
CREATE POLICY "Allow anonymous contact form inserts" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Create policy to allow authenticated users to read all messages (for admin)
CREATE POLICY IF NOT EXISTS "Allow authenticated users to read contact messages" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create function to insert contact messages (bypasses TypeScript issues)
CREATE OR REPLACE FUNCTION insert_contact_message(
  p_full_name TEXT,
  p_phone TEXT,
  p_email TEXT,
  p_service TEXT,
  p_message TEXT
)
RETURNS UUID AS $$
DECLARE
  new_id UUID;
BEGIN
  INSERT INTO contact_messages (full_name, phone, email, service, message)
  VALUES (p_full_name, p_phone, p_email, p_service, p_message)
  RETURNING id INTO new_id;
  
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a function to get contact message statistics
CREATE OR REPLACE FUNCTION get_contact_stats()
RETURNS TABLE (
  total_messages BIGINT,
  messages_today BIGINT,
  messages_this_week BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_messages,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) as messages_today,
    COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as messages_this_week
  FROM contact_messages;
END;
$$ LANGUAGE plpgsql;
