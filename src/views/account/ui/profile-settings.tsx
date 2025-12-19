import { Avatar, AvatarFallback, AvatarImage, ListItem } from '@shared/ui';
import { List } from '@shared/ui/list';
import { ChevronRightIcon } from 'lucide-react';

export const ProfileSettings = () => {
	const user = {
		name: 'Ruslan Shkhaliev',
		avatar: 'https://avatar.iran.liara.run/public/39',
		email: 'crazymonagoo@gmail.com',
		phone: '+994506884539',
	};

	const [firstName, surname] = user.name.split(' ');

	const avatarFallback =
		firstName[0].toUpperCase() + surname[0].toUpperCase();

	return (
		<List>
			<ListItem
				title={user.name}
				media={
					<Avatar className='size-10'>
						<AvatarImage src={user.avatar} />
						<AvatarFallback>{avatarFallback}</AvatarFallback>
					</Avatar>
				}
				description={'Фото профиля, имя, описание'}
				iconRight={<ChevronRightIcon className='size-5' />}
				className={
					'cursor-pointer hover:bg-muted transition-colors duration-300'
				}
			/>
		</List>
	);
};
