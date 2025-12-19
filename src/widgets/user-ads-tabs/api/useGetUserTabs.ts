import { UserTabItem } from '@/widgets/user-ads-tabs/model/types';
import { createBrowserClient } from '@api/supabase';
import { useQuery } from '@tanstack/react-query';

export const useGetUserTabs = () => {
	const supabase = createBrowserClient();
	return useQuery({
		queryKey: ['get-user-tabs'],
		queryFn: async (): Promise<UserTabItem[]> => {
			const { data, error } = await supabase.rpc(
				'get_profile_ads_counts',
			);

			if (error) {
				console.error('Error getting ads count:', error);
				throw error;
			}

			return data;
		},
		select: (data) => {
			return data.filter((item) => item.count > 0);
		},
		refetchOnMount: true,
	});
};
