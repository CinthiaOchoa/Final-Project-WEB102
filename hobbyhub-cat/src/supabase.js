import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mexhygmvlbmzfbjetukw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1leGh5Z212bGJtemZiamV0dWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNDM5NzYsImV4cCI6MjA2OTgxOTk3Nn0.GEDiXMcy6wXvwIgh5a6EJo_UYIKWoMjNzntvp4m-bpc'
export const supabase = createClient(supabaseUrl, supabaseKey)
