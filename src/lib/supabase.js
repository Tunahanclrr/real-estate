import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kjivkifypmvijbljvtyd.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqaXZraWZ5cG12aWpibGp2dHlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMTg1MjMsImV4cCI6MjA3NTY5NDUyM30.G4L4pMVdKyB1FxXjjKaLaE2Bf7unAyTHUOEbQCZ8Un8"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)