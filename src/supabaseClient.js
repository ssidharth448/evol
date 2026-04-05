import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mipibxlcmqgbmuthwydg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pcGlieGxjbXFnYm11dGh3eWRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNzcxODMsImV4cCI6MjA5MDk1MzE4M30.Fj4HBgcBAD0Qs2z0HajRNnUZIgSQEYD1KmQAHXA2gM4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);