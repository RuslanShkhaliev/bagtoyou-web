import { Category } from '@entities/category';
import { SupabaseClient } from '@supabase/supabase-js';

export const getCategories = async (
	supabase: SupabaseClient,
): Promise<Category[]> => {
	const { data, error } = await supabase.from('categories').select('*');

	if (error) {
		throw error;
	}

	return data;
};
