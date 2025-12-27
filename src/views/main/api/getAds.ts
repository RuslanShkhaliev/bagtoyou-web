import { createBrowserClient } from '@api/supabase';
import { getListingsPreview } from '@entities/listing/api/getAdPreview';
import { SupabaseClient } from '@supabase/supabase-js';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getListingsOptions = (supabase: SupabaseClient) => {
	return queryOptions({
		queryKey: ['listings'],
		queryFn: () => getListingsPreview(supabase),
		select: (data) => {
			console.log(data);
			return data.map((ad) => ({
				...ad,
				imageUrl: 'https://picsum.photos/200/300',
			}));
		},
	});
};

export const useGetListings = () => {
	return useSuspenseQuery(getListingsOptions(createBrowserClient()));
};
