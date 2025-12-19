import { Avatar, AvatarFallback, AvatarImage, Button } from '@shared/ui';
import { Edit2, Settings, Star } from 'lucide-react';
import Link from 'next/link';

export const ProfileCard = () => {
	const user = {
		id: '769bd620-0ba9-4f68-ba6a-4317b5b0eac0',
		name: 'Ruslan Shikhaliev',
		avatar: '/assets/default-avatar.svg',
		rating: 4.8,
		adsCount: 12,
		responseRate: 95,
		verified: true,
	};

	const handleSettings = () => {};

	return (
		<div className='mb-6 rounded-lg border bg-card p-4'>
			<div className='flex items-start gap-4'>
				{/* Аватар */}
				<Avatar>
					<AvatarImage
						src={user.avatar}
						alt={user.name}
						className='object-cover'
					/>
					<AvatarFallback>RS</AvatarFallback>
				</Avatar>

				{/* Информация о пользователе */}
				<div className='flex-1 space-y-2'>
					<div className='flex items-start justify-between'>
						<div>
							<h1 className='text-xl font-bold'>{user.name}</h1>
							{user.verified && (
								<p className='text-sm text-muted-foreground'>
									Профиль подтвержден
								</p>
							)}
						</div>

						{/* Кнопки действий */}
						<div className='flex gap-2'>
							<Link href={'/account/settings'}>
								<Button
									size='icon'
									variant='ghost'
								>
									<Edit2 className='h-5 w-5' />
								</Button>
							</Link>
							<Button
								variant='ghost'
								size='icon'
								onClick={handleSettings}
							>
								<Settings className='h-5 w-5' />
							</Button>
						</div>
					</div>

					{/* Статистика */}
					<div className='flex flex-wrap gap-4 text-sm'>
						<div className='flex items-center gap-1'>
							<Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
							<span className='font-semibold'>{user.rating}</span>
						</div>
						<div className='text-muted-foreground'>
							<span className='font-semibold text-foreground'>
								{user.adsCount}
							</span>{' '}
							объявлений
						</div>
						<div className='text-muted-foreground'>
							Отвечает на{' '}
							<span className='font-semibold text-foreground'>
								{user.responseRate}%
							</span>{' '}
							сообщений
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
