-- OSBIC Chatbot Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_role ON messages(role);

-- Enable Row Level Security (RLS)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for chatbot)
CREATE POLICY IF NOT EXISTS "Allow anonymous message inserts" ON messages
  FOR INSERT WITH CHECK (true);

-- Create policy to allow anonymous selects (for chatbot)
CREATE POLICY IF NOT EXISTS "Allow anonymous message selects" ON messages
  FOR SELECT USING (true);

-- Optional: Create a function to clean up old messages (older than 30 days)
CREATE OR REPLACE FUNCTION cleanup_old_messages()
RETURNS void AS $$
BEGIN
  DELETE FROM messages 
  WHERE created_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a scheduled job to run cleanup (requires pg_cron extension)
-- SELECT cron.schedule('cleanup-messages', '0 2 * * *', 'SELECT cleanup_old_messages();');






