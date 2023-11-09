import { createClient } from '@supabase/supabase-js'

// Load environment variables
const SUPABASE_URL= "https://dstlxmnajsywdftqcamk.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzdGx4bW5hanN5d2RmdHFjYW1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgzNTQ2NzcsImV4cCI6MjAxMzkzMDY3N30.nS-L05Ek-7lecJjSegFsVP-U_gzjlTFLKL9wekEZKjA"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)