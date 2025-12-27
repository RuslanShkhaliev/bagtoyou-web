import { ListingStatus } from '@entities/listing';
import { ItemGroup } from '@shared/ui';
import { useGetUserListings } from '@widgets/user-ads-tabs/api/useGetUserListings';
import { SkeletonLoader } from '@widgets/user-ads-tabs/ui/skeleton';
import Link from 'next/link';
import { FC, Fragment } from 'react';

interface UserAdsListProps {
	status: ListingStatus;
	onCardClick?: (adId: number) => void;
	onMenuClick?: (adId: number) => void;
	emptyMessage?: React.ReactNode;
}

export const UserAdsList: FC<UserAdsListProps> = ({
	status,
	onMenuClick,
	emptyMessage = 'Объявлений пока нет',
}) => {
	console.log(status, 'status');

	const { data: ads, isLoading } = useGetUserListings(status);

	if (isLoading) {
		return <SkeletonLoader count={5} />;
	}

	if (!ads?.length) {
		return (
			<div className='flex flex-col items-center justify-center py-12 text-center'>
				<p className='text-muted-foreground'>{emptyMessage}</p>
			</div>
		);
	}

	return (
		<ItemGroup className={'px-3 flex flex-col gap-3'}>
			{ads.map((ad) => (
				<Fragment key={ad.id}>
					<Link href={`/listings/${ad.id}`} />
				</Fragment>
			))}
		</ItemGroup>
	);
};
