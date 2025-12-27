import { SupabaseClient } from '@supabase/supabase-js';
import { queryOptions } from '@tanstack/react-query';
import { Ad } from '../model/types';

export const getAdDetails = async (
	supabase: SupabaseClient,
	adId: number,
): Promise<Ad> => {
	const { data, error } = await supabase
		.from('ads')
		.select(
			`
			id,
			title,
			description,
            price,
            currency,
            status,
            created_at,
            updated_at,
			category:categories(id, name),
			seller:profiles(*),
			images:ad_images(*)
		`,
		)
		.eq('id', adId)
		.single();

	if (error) {
		console.log(error);
		console.error('Error getting ad by ID:', error);
		throw error;
	}

	return data as unknown as Ad;
};

export const getAdOptions = (supabase: SupabaseClient, adId: number) => {
	return queryOptions({
		queryKey: ['ad', adId],
		queryFn: () => getAdDetails(supabase, adId),
	});
};
