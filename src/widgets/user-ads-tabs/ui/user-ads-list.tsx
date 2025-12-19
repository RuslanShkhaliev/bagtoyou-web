import { AdStatus, UserAdCard } from '@entities/ad';
import { ItemGroup } from '@shared/ui';
import { useGetUserAds } from '@widgets/user-ads-tabs/api/useGetUserAds';
import { SkeletonLoader } from '@widgets/user-ads-tabs/ui/skeleton';
import Link from 'next/link';
import { FC, Fragment } from 'react';

interface UserAdsListProps {
	status: AdStatus;
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

	const { data: ads, isLoading } = useGetUserAds(status);

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
					<Link href={`/ads/${ad.id}`}>
						<UserAdCard
							ad={ad}
							onMenuClick={onMenuClick}
						/>
					</Link>
				</Fragment>
			))}
		</ItemGroup>
	);
};
