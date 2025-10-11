import { createClient } from '@supabase/supabase-js'

// Supabase bağlantı bilgilerinizi buraya ekleyin
const supabaseUrl = 'https://your-project-url.supabase.co'
const supabaseKey = 'your-supabase-anon-key'

// Supabase istemcisini oluştur
export const supabase = createClient(supabaseUrl, supabaseKey)