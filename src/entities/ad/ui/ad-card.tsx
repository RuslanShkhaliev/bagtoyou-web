import { getMediaUrl } from '@api/supabase/helpers';
import { cn } from '@lib/utils';
import { Calendar, Eye, MapPin } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { Ad } from '../model/types';

interface AdCardProps extends React.HTMLAttributes<HTMLDivElement> {
	ad: Ad;
	onCardClick?: (adId: number) => void;
}

export function AdCard({ ad, onCardClick, className, ...props }: AdCardProps) {
	const handleClick = () => {
		onCardClick?.(ad.id);
	};

	const formatDate = (date: string) => {
		return new Intl.DateTimeFormat('ru-RU', {
			day: 'numeric',
			month: 'short',
		}).format(new Date(date));
	};

	const getLocationText = () => {
		const from = ad.location_from?.city || ad.location_from?.name;
		const to = ad.location_to?.city || ad.location_to?.name;

		if (from && to) {
			return `${from} → ${to}`;
		}
		return from || to || 'Не указано';
	};

	return (
		<div
			onClick={handleClick}
			className={cn(
				'group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-all hover:shadow-md cursor-pointer',
				className,
			)}
			{...props}
		>
			{/* Изображение */}
			<div className='relative w-full h-[150px] overflow-hidden bg-muted'>
				{ad.media && ad.media.length > 0 ? (
					<Image
						src={getMediaUrl(ad.media[0])}
						alt={ad.title}
						fill
					/>
				) : (
					<div className='flex h-full w-full items-center justify-center'>
						<MapPin className='h-12 w-12 text-muted-foreground' />
					</div>
				)}

				{/* Бейдж статуса */}
				{ad.is_booked && (
					<div className='absolute top-2 right-2 rounded-md bg-yellow-500 px-2 py-1 text-xs font-medium text-white'>
						Забронировано
					</div>
				)}
			</div>

			{/* Контент */}
			<div className='flex flex-1 flex-col gap-2 p-3'>
				{/* Заголовок */}
				<h3 className='line-clamp-2 text-sm font-semibold leading-tight text-foreground'>
					{ad.title}
				</h3>

				{/* Маршрут */}
				<div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
					<MapPin className='h-3.5 w-3.5 flex-shrink-0' />
					<span className='truncate'>{getLocationText()}</span>
				</div>

				{/* Даты */}
				{ad.date_start && ad.date_end && (
					<div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
						<Calendar className='h-3.5 w-3.5 flex-shrink-0' />
						<span>
							{formatDate(ad.date_start)} -{' '}
							{formatDate(ad.date_end)}
						</span>
					</div>
				)}

				{/* Нижняя часть: цена и просмотры */}
				<div className='mt-auto flex items-center justify-between pt-2'>
					{/* Цена */}
					<div className='text-base font-bold text-foreground'>
						{ad.rewards} {ad.currency || '₽'}
					</div>

					{/* Просмотры */}
					<div className='flex items-center gap-1 text-xs text-muted-foreground'>
						<Eye className='h-3.5 w-3.5' />
						<span>{ad.views}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
