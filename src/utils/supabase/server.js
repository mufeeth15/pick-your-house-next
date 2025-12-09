import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log("--- Supabase Env Var Debug ---");
  console.log("SUPABASE_URL present:", !!supabaseUrl, supabaseUrl ? `(Length: ${supabaseUrl.length})` : "");
  console.log("SUPABASE_KEY present:", !!supabaseKey, supabaseKey ? `(Length: ${supabaseKey.length})` : "");
  console.log("------------------------------");
  console.error("Supabase Error: Missing Environment Variables. Check .env.local");
}

export const supabaseServer = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : {
    from: () => ({
      insert: async () => ({ error: { message: "Supabase environment variables missing. Check server logs." }, data: null }),
      select: () => ({
        order: () => ({ error: { message: "Supabase environment variables missing. Check server logs." }, data: null }),
        then: (resolve) => resolve({ error: { message: "Supabase environment variables missing. Check server logs." }, data: null })
      })
    })
  };
