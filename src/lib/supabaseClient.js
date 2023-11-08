import { createClient } from '@supabase/supabase-js'

// Load environment variables
const SUPABASE_URL = import.meta.env.SUPABASE_ANON_KEY;
const SUPABASE_ANON_KEY = import.meta.env.SUPABASE_URL;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)