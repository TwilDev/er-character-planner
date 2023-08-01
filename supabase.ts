import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl= 'https://rvxqryfpxuljlpiczqmh.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY ?? ''
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabase;