import { createBrowserClient } from '@api/supabase';
import { Ad } from '@entities/ad';
import { SupabaseClient } from '@supabase/supabase-js';
import {
	QueryClient,
	queryOptions,
	useMutation,
	useSuspenseQuery,
} from '@tanstack/react-query';

const getAdById = async (supabase: SupabaseClient, id: number): Promise<Ad> => {
	const { data, error } = await supabase
		.from('ads')
		.select('*')
		.eq('id', id)
		.single();

	if (error) {
		console.error('Error getting ad by ID:', error);
		throw error;
	}

	return data as Ad;
};

export const getAdByIdOptions = (supabase: SupabaseClient, id: number) =>
	queryOptions({
		queryKey: ['get-ad-by-id', id],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('ads')
				.select('*')
				.eq('id', id)
				.single();

			if (error) {
				console.error('Error getting ad by ID:', error);
				throw error;
			}

			return data as Ad;
		},
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
