import { Ad } from '@entities/ad';
import { SupabaseClient } from '@supabase/supabase-js';

export const getAdsPreview = async (
	supabase: SupabaseClient,
): Promise<Ad[]> => {
	const { data, error } = await supabase
		.from('ads')
		.select(
			`
			*,
			category:categories(*),
			images:ad_images(*)
		`,
		)
		.order('created_at', { ascending: false });

	if (error) {
		throw error;
	}

	return data as Ad[];
};
