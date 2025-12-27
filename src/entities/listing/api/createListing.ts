import { Ad, CreateAd } from '@entities/listing';
import { SupabaseClient } from '@supabase/supabase-js';

export const createAd = async (
	supabase: SupabaseClient,
	ad: CreateAd,
): Promise<Ad> => {
	const { data, error } = await supabase
		.from('ads')
		.insert(ad)
		.select('*')
		.single();

	if (error) {
		throw error;
	}

	return data;
};
