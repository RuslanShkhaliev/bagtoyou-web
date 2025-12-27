import { ListingPreview } from '@entities/ad';
import { FavoriteButton } from '@features/add-favorite';
import {
	AmountDisplay,
	Card,
	CardContent,
	CardFooter,
	CardTitle,
} from '@shared/ui';
import { AspectRatio } from '@shared/ui/aspect-ratio';
import { ImageIcon, MapPin } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

interface ListingCardProps {
	data: ListingPreview;
	onClick: () => void;
}

export const ListingCard: FC<ListingCardProps> = ({ data, onClick }) => {
	return (
		<Card
			onClick={onClick}
			className='overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group py-0 gap-0 rounded-sm'
		>
			<AspectRatio
				ratio={1}
				className={'flex items-center justify-center'}
			>
				{Boolean(data.preview_image) ? (
					<Image
						src={data.preview_image}
						alt={data.title}
						fill
						unoptimized
						className='h-full w-full object-cover'
					/>
				) : (
					<ImageIcon size={'40%'} />
				)}
			</AspectRatio>
			<CardContent className={'px-2 mb-1'}>
				<CardTitle className='flex items-start justify-between gap-2'>
					<h3 className='flex-1 font-medium line-clamp-2'>
						{data.title}
					</h3>
					<FavoriteButton
						favorite={data.is_favorite}
						ad_id={data.id}
					/>
				</CardTitle>
				<AmountDisplay
					amount={data.price}
					currency={data.currency || '₽'}
					className='text-primary font-bold text-sm'
				/>
			</CardContent>
			<CardFooter className='flex items-center justify-between px-2 pb-2'>
				<div className='flex items-center gap-1 text-muted-foreground'>
					<MapPin className='h-4 w-4' />
					<span className='text-sm line-clamp-1'>
						{data.location || 'Москва'}
					</span>
				</div>
			</CardFooter>
		</Card>
	);
};
