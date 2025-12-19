'use client';

import { ProfileCard } from '@views/account/ui/profile-card';
import { UserAdsTabs } from '@widgets/user-ads-tabs';

export const AccountPage = () => {
	// TODO: Получить данные пользователя из API
	const user = {
		id: '769bd620-0ba9-4f68-ba6a-4317b5b0eac0',
		name: 'Ruslan Shikhaliev',
		avatar: '/assets/default-avatar.svg',
		rating: 4.8,
		adsCount: 12,
		responseRate: 95,
		verified: true,
	};

	const handleEditProfile = () => {
		// TODO: Реализовать редактирование профиля
		console.log('Edit profile');
	};

	const handleSettings = () => {
		// TODO: Реализовать переход в настройки
		console.log('Settings');
	};

	return (
		<div className='container mx-auto max-w-4xl px-4 py-6'>
			<ProfileCard />

			{/* Вкладки с объявлениями */}
			<UserAdsTabs />
		</div>
	);
};
