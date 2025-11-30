import { createClient } from '@supabase/supabase-js';
import { Database } from './.generated';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
if (!supabaseUrl) {
	throw new Error('Missing Supabase URL');
}
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY as string;

if (!supabaseKey) {
	throw new Error('Missing Supabase API Key');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
