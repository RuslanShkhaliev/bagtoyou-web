'use client';

import { Badge, Button } from '@shared/ui';
import { Dialog, DialogContent } from '@shared/ui/dialog';
import { Calendar, Mail, MapPin, Phone, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import type { AdModel } from 'src/entities/ad/ui/AdCard';

interface AdDetailsProps {
	data: AdModel | null;
	open: boolean;
}

export const AdDetails: FC<AdDetailsProps> = ({ data, open = true }) => {
	const [isOpen, setIsOpened] = useState(open);
	const router = useRouter();
	console.log(data);
	const onOpenChange = (open: boolean) => {
		if (open) setIsOpened(true);
		else {
			setIsOpened(false);
			router.back();
		}
	};
	if (!data) return null;

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onOpenChange}
		>
			<DialogContent className='max-w-3xl max-h-[90vh] overflow-y-auto'>
				<div className='space-y-6'>
					<img
						src={data.imageUrl}
						alt={data.title}
						className='w-full h-64 object-cover rounded-lg'
					/>
					<h3 className={'font-medium text-xl'}>{data.title}</h3>

					<div className='flex items-center justify-between'>
						<p className='text-primary font-bold text-2xl'>
							{data.price.toLocaleString('ru-RU')} ₽
						</p>
						<Badge
							variant='secondary'
							className='text-base px-4 py-1'
						>
							{data.category.name}
						</Badge>
					</div>

					<div>
						<h3 className='mb-2'>Описание</h3>
						<p className='text-muted-foreground'>
							{data.description}
						</p>
					</div>

					<div className='flex items-center gap-2 text-muted-foreground'>
						<MapPin className='h-5 w-5' />
						<span>{data.location}</span>
					</div>

					<div className='flex items-center gap-2 text-muted-foreground'>
						<Calendar className='h-5 w-5' />
						<span>
							Опубликовано:{' '}
							{new Date(data.createdAt).toLocaleDateString(
								'ru-RU',
							)}
						</span>
					</div>

					<div className='border-t pt-6'>
						<h3 className='mb-4'>Контакты продавца</h3>

						<div className='space-y-3'>
							<div className='flex items-center gap-3'>
								<User className='h-5 w-5 text-muted-foreground' />
								<span>{data.seller.name}</span>
							</div>

							<div className='flex items-center gap-3'>
								<Phone className='h-5 w-5 text-muted-foreground' />
								<a
									href={`tel:${data.seller.phone}`}
									className='hover:underline'
								>
									{data.seller.phone}
								</a>
							</div>

							<div className='flex items-center gap-3'>
								<Mail className='h-5 w-5 text-muted-foreground' />
								<a
									href={`mailto:${data.seller.email}`}
									className='hover:underline'
								>
									{data.seller.email}
								</a>
							</div>
						</div>

						<div className='flex gap-3 mt-6'>
							<Button className='flex-1'>
								<a
									className={'flex items-center'}
									href={`tel:${data.seller.phone}`}
								>
									<Phone className='h-4 w-4 mr-2' />
									Позвонить
								</a>
							</Button>
							<Button
								className='flex-1'
								variant='outline'
							>
								<a
									className={'flex items-center'}
									href={`mailto:${data.seller.email}`}
								>
									<Mail className='h-4 w-4 mr-2' />
									Написать
								</a>
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
