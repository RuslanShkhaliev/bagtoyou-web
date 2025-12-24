import { createBrowserClient } from '@api/supabase';
import { AdStatus } from '@entities/ad';
import { useQuery } from '@tanstack/react-query';

export const useGetUserAds = (status: AdStatus) => {
	const supabase = createBrowserClient();
	console.log('status');
	return useQuery({
		queryKey: ['get-user-ads', status],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('ads')
				.select('*')
				.eq('status', status)
				.order('updated_at', { ascending: false });

			if (error) {
				throw error;
			}

			return data;
		},
	});
};
