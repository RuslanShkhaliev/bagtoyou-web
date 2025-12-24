import { createBrowserClient } from '@api/supabase';
import { getAdsPreview } from '@entities/ad/api/getAdPreview';
import { SupabaseClient } from '@supabase/supabase-js';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getAdsOptions = (supabase: SupabaseClient) => {
	return queryOptions({
		queryKey: ['ads'],
		queryFn: () => getAdsPreview(supabase),
		select: (data) => {
			console.log(data);
			return data.map((ad) => ({
				...ad,
				imageUrl: 'https://picsum.photos/200/300',
			}));
		},
	});
};

export const useGetAds = () => {
	return useSuspenseQuery(getAdsOptions(createBrowserClient()));
};
