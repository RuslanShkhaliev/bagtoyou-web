import { getMediaUrl } from '@api/supabase/helpers';
import { cn } from '@lib/utils';
import {
	AmountDisplay,
	Card,
	CardContent,
	Carousel,
	CarouselApi,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@shared/ui';
import { Calendar, Clock, Eye, MapPin, Package, User } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
	Ad,
	AD_STATUS_COLORS,
	AD_STATUS_LABELS,
	AD_TYPE_LABELS,
	AdStatus,
	AdType,
} from '../model/types';

interface AdDetailProps {
	ad: Ad;
	permissions: AdPermissions;
	renderActions?: () => React.ReactNode;
	renderAuthPrompt?: () => React.ReactNode;
	className?: string;
}

export const AdDetail: React.FC<AdDetailProps> = ({
	ad,
	permissions,
	renderActions,
	renderAuthPrompt,
	className,
}) => {
	const [api, setApi] = useState<CarouselApi | null>(null);
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!api) return;

		setCount(api.scrollSnapList().length);

		const updateCurrent = () => {
			setCurrent(api.selectedScrollSnap() + 1);
		};

		updateCurrent();
		api.on('select', updateCurrent);

		return () => {
			api?.off('select', updateCurrent);
		};
	}, [api]);
	const formatDate = (date: string) => {
		return new Intl.DateTimeFormat('ru-RU', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		}).format(new Date(date || new Date()));
	};

	const formatDateTime = (date: string) => {
		return new Intl.DateTimeFormat('ru-RU', {
			day: 'numeric',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit',
		}).format(new Date(date));
	};

	const status = ad.status as AdStatus;
	const adType = ad.type as AdType;

	return (
		<div className={cn('flex flex-col gap-6', className)}>
			{/* Галерея изображений */}
			<div className='mx-auto max-w-xs'>
				<Carousel
					setApi={setApi}
					className='w-full max-w-xs'
				>
					{ad.media.map((media, index) => (
						<CarouselItem key={index}>
							<Card>
								<CardContent className='flex aspect-square items-center justify-center p-6'>
									<Image
										className='object-cover'
										priority
										src={getMediaUrl(media)}
										alt={''}
										fill
									/>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
				<div className='text-muted-foreground py-2 text-center text-sm'>
					Slide {current} of {count}
				</div>
			</div>
			{ad.media && ad.media.length > 0 && (
				<div className='relative aspect-video w-full overflow-hidden rounded-lg bg-muted'>
					<Image
						src={getMediaUrl(ad.media[0])}
						alt={ad.title}
						fill
						className='object-cover'
						priority
					/>
				</div>
			)}

			{/* Заголовок и действия */}
			<div className='flex items-start justify-between gap-4'>
				<div className='flex-1 space-y-2'>
					<h1 className='text-2xl font-bold leading-tight'>
						{ad.title}
					</h1>

					{/* Бейджи */}
					<div className='flex flex-wrap items-center gap-2'>
						<span className='inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-sm font-medium text-primary'>
							{AD_TYPE_LABELS[adType]}
						</span>
						<span
							className={cn(
								'inline-flex items-center rounded-md px-2.5 py-1 text-sm font-medium',
								AD_STATUS_COLORS[status],
							)}
						>
							{AD_STATUS_LABELS[status]}
						</span>
						{ad.is_booked && (
							<span className='inline-flex items-center rounded-md bg-yellow-100 px-2.5 py-1 text-sm font-medium text-yellow-700'>
								Забронировано
							</span>
						)}
					</div>
				</div>

				{/* Меню действий */}
				{renderActions && <div>{renderActions()}</div>}
			</div>

			{/* Цена */}
			<div className='flex items-baseline gap-2'>
				<AmountDisplay
					amount={ad.rewards}
					currency={ad.currency}
					className='text-3xl font-bold text-foreground'
				/>
			</div>

			{/* Маршрут */}
			<div className='space-y-3 rounded-lg border bg-card p-4'>
				<h3 className='font-semibold'>Маршрут</h3>
				<div className='flex items-center gap-3'>
					<MapPin className='h-5 w-5 flex-shrink-0 text-muted-foreground' />
					<div className='flex-1'>
						<div className='text-sm text-muted-foreground'>
							Откуда
						</div>
						<div className='font-medium'>
							{ad.location_from?.city ||
								ad.location_from?.name ||
								'Не указано'}
						</div>
					</div>
				</div>
				<div className='flex items-center gap-3'>
					<MapPin className='h-5 w-5 flex-shrink-0 text-primary' />
					<div className='flex-1'>
						<div className='text-sm text-muted-foreground'>
							Куда
						</div>
						<div className='font-medium'>
							{ad.location_to?.city ||
								ad.location_to?.name ||
								'Не указано'}
						</div>
					</div>
				</div>
			</div>

			{/* Детали объявления */}
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
				<div className='space-y-4'>
					<div className='flex items-center gap-3'>
						<User className='h-5 w-5 text-muted-foreground' />
						<div>
							<div className='text-sm text-muted-foreground'>
								Водитель
							</div>
							<div className='font-medium'>
								{ad.driver?.full_name || 'Не указано'}
							</div>
						</div>
					</div>

					<div className='flex items-center gap-3'>
						<Package className='h-5 w-5 text-muted-foreground' />
						<div>
							<div className='text-sm text-muted-foreground'>
								Груз
							</div>
							<div className='font-medium'>
								{ad.cargo_type?.name || 'Не указано'}
							</div>
						</div>
					</div>

					<div className='flex items-center gap-3'>
						<Clock className='h-5 w-5 text-muted-foreground' />
						<div>
							<div className='text-sm text-muted-foreground'>
								Дата отправки
							</div>
							<div className='font-medium'>
								{formatDate(ad.departure_date)}
							</div>
						</div>
					</div>
				</div>

				<div className='space-y-4'>
					<div className='flex items-center gap-3'>
						<Calendar className='h-5 w-5 text-muted-foreground' />
						<div>
							<div className='text-sm text-muted-foreground'>
								Срок действия
							</div>
							<div className='font-medium'>
								{formatDate(ad.expiry_date || new Date())}
							</div>
						</div>
					</div>

					<div className='flex items-center gap-3'>
						<Eye className='h-5 w-5 text-muted-foreground' />
						<div>
							<div className='text-sm text-muted-foreground'>
								Просмотров
							</div>
							<div className='font-medium'>
								{ad.views_count || 0}
							</div>
						</div>
					</div>

					<div className='flex items-center gap-3'>
						<Clock className='h-5 w-5 text-muted-foreground' />
						<div>
							<div className='text-sm text-muted-foreground'>
								Добавлено
							</div>
							<div className='font-medium'>
								{formatDateTime(ad.created_at)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Описание */}
			{ad.description && (
				<div className='rounded-lg border bg-card p-4'>
					<h3 className='font-semibold mb-2'>Описание</h3>
					<p className='text-muted-foreground'>{ad.description}</p>
				</div>
			)}

			{/* Авторизация */}
			{!permissions.canView && renderAuthPrompt && (
				<div className='rounded-lg border bg-card p-4'>
					{renderAuthPrompt()}
				</div>
			)}
		</div>
	);
};
