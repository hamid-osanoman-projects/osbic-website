import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// ✅ Keep your project URL (OK to hardcode if private repo)
const SUPABASE_URL = "https://pwdiyfiakgqywdxykgzk.supabase.co";

// ⚠️ IMPORTANT: never commit your anon key in public repos.
// Use environment variables instead:
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3ZGl5Zmlha2dxeXdkeHlrZ3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3OTc5OTYsImV4cCI6MjA3NTM3Mzk5Nn0.p70SKnkV4XMdpWxNUtA0r2tdA5ir9u4mccGUVaM4cFk";

// ✅ Typed Supabase client using your live schema
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
