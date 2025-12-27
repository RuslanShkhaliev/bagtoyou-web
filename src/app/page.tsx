import { createServerClient } from '@api/supabase/server';
import { getQueryClient } from '@lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getListingsOptions } from '@views/main/api/getAds';
import { SearchPage } from '@views/main/ui/MainPage';

export default async function Page() {
	const queryClient = getQueryClient();

	void queryClient.fetchQuery(getListingsOptions(await createServerClient()));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<SearchPage />
		</HydrationBoundary>
	);
}
