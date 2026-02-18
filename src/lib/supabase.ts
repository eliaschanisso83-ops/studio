import { createClient } from '@supabase/supabase-js';

// Credentials for gvhvphctjtrzgnjqleqd project
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gvhvphctjtrzgnjqleqd.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_g4CfrZPp-pJm9hVpJ3mkHQ_b45K0LA8';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Check your integration.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
