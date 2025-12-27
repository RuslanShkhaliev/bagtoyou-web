import { Ad } from '@entities/ad';
import { SupabaseClient } from '@supabase/supabase-js';

export const getListingsPreview = async (
	supabase: SupabaseClient,
): Promise<Ad[]> => {
	const { data, error } = await supabase
		.from('ads_preview')
		.select('*')
		.order('created_at', { ascending: false });

	console.log('data', data);
	if (error) {
		throw error;
	}

	return data as Ad[];
};
