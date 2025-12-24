import { createBrowserClient } from '@api/supabase';
import { Category } from '@entities/category';
import { useQuery } from '@tanstack/react-query';

export const useGetCategories = () => {
	const supabase = createBrowserClient();
	return useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('categories')
				.select('*');

			if (error) {
				throw error;
			}

			return data as Category[];
		},
		select: (data) => data.filter(({ parent_id }) => parent_id === null),
	});
};
