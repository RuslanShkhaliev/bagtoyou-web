import { Badge, List, ListItem } from '@shared/ui';
import {
	ChevronRightIcon,
	KeyRound,
	Mail,
	Phone,
	ShieldCheck,
} from 'lucide-react';

export const BaseSettings = () => {
	const user = {
		name: 'Ruslan Shikhaliev',
		avatar: 'https://avatar.iran.liara.run/public/39',
		email: 'crazymonagoo@gmail.com',
		phone: '+994506884539',
	};
	const baseSettings = [
		{
			href: '/account/edit/contacts',
			title: 'Email',
			icon: <Mail />,
			description: user.email,
			badge: 'Не подтверждён',
			handler: () => console.log('Edit email'),
		},
		{
			href: '/account/edit/phone',
			title: 'Телефон',
			icon: <Phone />,
			description: user.phone,
			badge: 'Не подтверждён',
			handler: () => console.log('Edit phone'),
		},
		{
			href: '/account/edit/phone',
			icon: <ShieldCheck />,
			title: 'Подтверждение через соцсети',
			description: 'Подтвержден',
			handler: () => console.log('Edit phone'),
		},
		{
			href: '/account/edit/phone',
			icon: <KeyRound />,
			title: 'Безопасность и вход',
			handler: () => console.log('Edit phone'),
		},
	];

	return (
		<List
			items={baseSettings}
			separator
			renderItem={(section) => (
				<ListItem
					title={section.title}
					media={section.icon}
					description={section.description}
					iconRight={<ChevronRightIcon />}
					onClick={section.handler}
					badge={
						section.badge && (
							<Badge variant={'destructive'}>
								{section.badge}
							</Badge>
						)
					}
				/>
			)}
		/>
	);
};
