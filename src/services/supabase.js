import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL and key must be provided.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
