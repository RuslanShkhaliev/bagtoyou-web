import { createBrowserClient } from '@api/supabase';
import { useMutation } from '@tanstack/react-query';

export const useToggleFavorite = () => {
	const supabase = createBrowserClient();
	return useMutation({
		mutationFn: async (ad_id: number) => {
			const { data, error } = await supabase.rpc('toggle_favorite', {
				p_ad_id: ad_id,
			});

			console.log(data);

			if (error) {
				console.error('Error toggling favorite:', error);
				throw error;
			}
		},
	});
};
