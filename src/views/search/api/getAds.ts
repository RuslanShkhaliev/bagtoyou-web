import { createBrowserClient } from '@api/supabase';
import { Ad } from '@entities/ad';
import { SupabaseClient } from '@supabase/supabase-js';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getAds = async (supabase: SupabaseClient): Promise<Ad[]> => {
	const { data, error } = await supabase
		.from('ads_active_view')
		.select('*')
		.order('created_at', { ascending: false });

	if (error) {
		throw error;
	}

	return data as Ad[];
};

export const getAdsOptions = (supabase: SupabaseClient) => {
	return queryOptions({
		queryKey: ['ads'],
		queryFn: () => getAds(supabase),
	});
};

export const useGetAds = () => {
	return useSuspenseQuery(getAdsOptions(createBrowserClient()));
};
