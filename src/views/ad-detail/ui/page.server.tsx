import { createBrowserClient } from '@api/supabase';
import { getQueryClient } from '@lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getAdByIdOptions } from '@views/ad-detail/api/queries';
import { FC } from 'react';
import { AdPage } from './page.client';

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}
export const AdDetailPage: FC<PageProps> = async ({ params }) => {
	const { id } = await params;
	const adId = Number(id);
	const queryClient = getQueryClient();

	queryClient.prefetchQuery(getAdByIdOptions(createBrowserClient(), adId));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<AdPage />
		</HydrationBoundary>
	);
};
