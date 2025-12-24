import { createBrowserClient } from '@api/supabase';
import { getAdDetails } from '@entities/ad/api/getAdDetails';
import { SupabaseClient } from '@supabase/supabase-js';
import {
	QueryClient,
	queryOptions,
	useMutation,
	useSuspenseQuery,
} from '@tanstack/react-query';

export const getAdByIdOptions = (supabase: SupabaseClient, id: number) =>
	queryOptions({
		queryKey: ['get-ad-by-id', id],
		queryFn: () => getAdDetails(supabase, id),
	});
export const useGetAdById = (id: number) => {
	return useSuspenseQuery(getAdByIdOptions(createBrowserClient(), id));
};

export const useGetAdByIdServer = (queryClient: QueryClient, id: number) => {
	queryClient.prefetchQuery(getAdByIdOptions(createBrowserClient(), id));
};

export const useDeleteAd = () => {
	const supabase = createBrowserClient();

	return useMutation({
		mutationFn: async (id: number) => {
			if (!confirm('Вы уверены, что хотите удалить объявление?')) {
				return;
			}

			const { error } = await supabase.from('ads').delete().eq('id', id);

			if (error) {
				throw error;
			}
		},
	});
};
