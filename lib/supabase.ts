import { createClient } from '@supabase/supabase-js'

// Make sure these environment variables are set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a client that handles missing env vars gracefully during build
let supabaseClient: any = null

if (supabaseUrl && supabaseKey) {
  supabaseClient = createClient(supabaseUrl, supabaseKey)
}

// Export a function that checks for client availability
export function getSupabaseClient() {
  if (!supabaseClient) {
    throw new Error('Supabase client not initialized. Please check your environment variables.')
  }
  return supabaseClient
}

// For backward compatibility
export { supabaseClient as supabase }

// Types for our database
export interface Lead {
  id?: number
  created_at?: string
  email: string
  full_name: string
  project_url: string
}
