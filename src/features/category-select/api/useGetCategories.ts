import { createBrowserClient } from '@api/supabase';
import { buildTree } from '@entities/category';
import { getCategories } from '@entities/category/api/getCategories';
import { useQuery } from '@tanstack/react-query';

export const useGetCategories = () => {
	const supabase = createBrowserClient();
	return useQuery({
		queryKey: ['categories'],
		queryFn: () => getCategories(supabase),
		select(data) {
			return buildTree(data);
		},
	});
};
