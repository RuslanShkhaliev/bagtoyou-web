import { Category } from '@entities/category';
import { cn } from '@lib/utils';
import {
	AmountDisplay,
	Button,
	Card,
	CardContent,
	CardFooter,
	CardTitle,
} from '@shared/ui';
import { AspectRatio } from '@shared/ui/aspect-ratio';
import { Heart, ImageIcon, MapPin } from 'lucide-react';
import Image from 'next/image';

export interface AdModel {
	id: string;
	title: string;
	price: number;
	description: string;
	category: Category;
	location: string;
	imageUrl: string;
	currency: string;
	is_favorite: boolean;
	images: string[];
	seller: {
		name: string;
		phone: string;
		email: string;
	};
	createdAt: string;
}

interface AdCardProps {
	data: AdModel;
	onToggleFavorite: (id: string) => void;
}

export function AdCard({ data, onToggleFavorite }: AdCardProps) {
	return (
		<Card className='overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group py-0 gap-0 rounded-sm'>
			<AspectRatio
				ratio={1}
				className={'flex items-center justify-center'}
			>
				{Boolean(data.images?.length) ? (
					<Image
						src={data.images[0]}
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
					<Button
						variant='ghost'
						className={cn(
							data.is_favorite && 'text-red-500',
							'h-5 w-5',
						)}
						onClick={(e) => {
							e.stopPropagation();
							onToggleFavorite(data.id);
						}}
					>
						<Heart
							className={`h-5 w-5 ${data.is_favorite ? 'fill-current' : ''}`}
						/>
					</Button>
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
}
