import { useDebouncedValue } from '@hooks/use-debounced-value';
import { geoApiClient } from '@lib/geoDb';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const useSearchCities = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const debouncedQuery = useDebouncedValue(searchQuery, 400);

	const { data, isLoading } = useQuery({
		queryKey: ['searchCities', searchQuery],
		queryFn: async () => {
			const data = await geoApiClient.getCities({
				namePrefix: searchQuery,
			});

			return data.data;
		},
		enabled: debouncedQuery.length >= 2,
	});

	return {
		data,
		search: setSearchQuery,
		isLoading: isLoading,
	};
};
