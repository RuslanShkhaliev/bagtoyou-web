import { SupabaseClient } from '@supabase/supabase-js';
import { queryOptions } from '@tanstack/react-query';
import { Ad } from '../model/types';

async function getAd(supabase: SupabaseClient, adId: number): Promise<Ad> {
	const { data, error } = await supabase
		.from('ads')
		.select('*')
		.eq('id', adId)
		.single();

	if (error) {
		throw error;
	}

	return data;
}

export const getAdOptions = (supabase: SupabaseClient, adId: number) => {
	return queryOptions({
		queryKey: ['ad', adId],
		queryFn: () => getAd(supabase, adId),
	});
};
