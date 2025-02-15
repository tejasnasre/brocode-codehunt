import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gvkewilbrgmyocdurhob.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2a2V3aWxicmdteW9jZHVyaG9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk2MDcxMjQsImV4cCI6MjA1NTE4MzEyNH0.VZEWtALEp_sqHUF7nFQFbPy8AkSZ35pNQhQsTN5W8Dw"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
