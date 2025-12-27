import { createBrowserClient } from '@api/supabase';
import { AdModel } from '@entities/listing';
import { ListingDetails } from '@entities/listing/ui/ListingDetails';
import { getQueryClient } from '@lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getAdByIdOptions } from '@views/listing-details/api/queries';
import { FC } from 'react';

interface AdDetailsPageProps {
	params: Promise<{
		id: string;
	}>;
}
export const AdDetailsPage: FC<AdDetailsPageProps> = async ({ params }) => {
	const { id } = await params;
	const adId = Number(id);
	const queryClient = getQueryClient();
	const ad = await queryClient.fetchQuery(
		getAdByIdOptions(createBrowserClient(), adId),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ListingDetails data={ad as unknown as AdModel} />
		</HydrationBoundary>
	);
};
