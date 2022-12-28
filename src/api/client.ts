import { url, api_key } from './db';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = url
const supabaseAnonKey = api_key

export const supabase = createClient(supabaseUrl, supabaseAnonKey)