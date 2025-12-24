import { createBrowserClient } from '@api/supabase';
import { AdModel } from '@entities/ad';
import { AdDetails } from '@entities/ad/ui/AdDetails';
import { getQueryClient } from '@lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getAdByIdOptions } from '@views/ad-detail/api/queries';
import { FC } from 'react';

interface PageProps {
	params: Promise<{
		id: string;
	}>;
}
export const AdDetailPage: FC<PageProps> = async ({ params }) => {
	const { id } = await params;
	const adId = Number(id);
	const queryClient = getQueryClient();
	const ad = await queryClient.fetchQuery(
		getAdByIdOptions(createBrowserClient(), adId),
	);

	console.log({ ad }, 'ad');
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<AdDetails data={ad as unknown as AdModel} />
		</HydrationBoundary>
	);
};
