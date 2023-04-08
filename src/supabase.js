
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uixdljegstptfmxqclvx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpeGRsamVnc3RwdGZteHFjbHZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA5NjQwOTAsImV4cCI6MTk5NjU0MDA5MH0.uVK0-G2RR-Ea7UGhCoWGTH3b_bfhaKC18gm2qH6n2kg'
export const supabase = createClient(supabaseUrl, supabaseKey)