import { getMediaUrl } from '@api/supabase/helpers';
import { cn } from '@lib/utils';
import { AmountDisplay, Button } from '@shared/ui';
import { Calendar, Eye, MapPin, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { HTMLAttributes } from 'react';
import {
	Ad,
	AD_STATUS_COLORS,
	AD_STATUS_LABELS,
	AD_TYPE_LABELS,
	AdStatus,
	AdType,
} from '../model/types';

interface UserAdCardProps extends Omit<
	HTMLAttributes<HTMLDivElement>,
	'onClick'
> {
	ad: Ad;
	onClick?: (adId: number) => void;
	onMenuClick?: (adId: number) => void;
}

export function UserAdCard({
	ad,
	onClick,
	onMenuClick,
	className,
	...props
}: UserAdCardProps) {
	const handleClick = () => {
		onClick?.(ad.id);
	};

	const handleMenuClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onMenuClick?.(ad.id);
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

	const status = ad.status as AdStatus;
	const adType = ad.type as AdType;

	return (
		<div
			onClick={handleClick}
			className={cn(
				'group relative flex gap-3 overflow-hidden rounded-lg border bg-card p-3 transition-all hover:shadow-md cursor-pointer',
				className,
			)}
			{...props}
		>
			{/* Превью изображения */}
			<div className='relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted'>
				{ad.media && ad.media.length > 0 ? (
					<Image
						src={getMediaUrl(ad.media[0])}
						alt={ad.title}
						fill
						className='object-cover'
					/>
				) : (
					<div className='flex h-full w-full items-center justify-center'>
						<MapPin className='h-8 w-8 text-muted-foreground' />
					</div>
				)}
			</div>

			{/* Контент */}
			<div className='flex flex-1 flex-col gap-1.5 overflow-hidden'>
				<div className='flex items-start justify-between gap-2'>
					<h3 className='line-clamp-1 text-sm font-semibold leading-tight text-foreground'>
						{ad.title}
					</h3>
					<Button
						variant='ghost'
						size='icon'
						className='h-6 w-6 flex-shrink-0'
						onClick={handleMenuClick}
					>
						<MoreVertical className='h-4 w-4' />
					</Button>
				</div>

				<AmountDisplay
					className='text-sm font-semibold text-foreground'
					amount={ad.rewards}
					currency={ad.currency || '₽'}
				/>

				{/* Бейджи: тип и статус */}
				<div className='flex flex-wrap items-center gap-1.5'>
					<span className='inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary'>
						{AD_TYPE_LABELS[adType]}
					</span>
					<span
						className={cn(
							'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
							AD_STATUS_COLORS[status],
						)}
					>
						{AD_STATUS_LABELS[status]}
					</span>
					{ad.is_booked && (
						<span className='inline-flex items-center rounded-md bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700'>
							Забронировано
						</span>
					)}
				</div>

				{/* Маршрут */}
				<div className='flex items-center gap-1 text-xs text-muted-foreground'>
					<MapPin className='h-3 w-3 flex-shrink-0' />
					<span className='truncate'>{getLocationText()}</span>
				</div>

				{/* Нижняя строка: даты, цена, просмотры */}
				<div className='mt-auto flex items-center justify-between gap-2 text-xs'>
					{/* Даты */}
					{ad.date_start && ad.date_end && (
						<div className='flex items-center gap-1 text-muted-foreground'>
							<Calendar className='h-3 w-3 flex-shrink-0' />
							<span className='truncate'>
								{formatDate(ad.date_start)} -{' '}
								{formatDate(ad.date_end)}
							</span>
						</div>
					)}

					{/* Цена и просмотры */}
					<div className='flex items-center gap-3'>
						<div className='flex items-center gap-1 text-muted-foreground'>
							<Eye className='h-3 w-3' />
							<span>{ad.views}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
