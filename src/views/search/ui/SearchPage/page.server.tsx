import { createServerClient } from '@api/supabase/server';
import { getQueryClient } from '@lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getAdsOptions } from '@views/search/api/getAds';
import { SearchPage } from './page.client';

export const Page = async () => {
	const queryClient = getQueryClient();

	void queryClient.prefetchQuery(getAdsOptions(await createServerClient()));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<SearchPage />
		</HydrationBoundary>
	);
};
