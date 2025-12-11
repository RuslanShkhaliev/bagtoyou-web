'use client';

import {TabItem} from '@/widgets/tabbar/ui/TabItem';
import {Tabs} from '@/widgets/tabbar/ui/Tabs';
import {HeartIcon, LayersIcon, MessageCircle, TextSearchIcon, User} from 'lucide-react';
import {usePathname} from 'next/navigation';

export const Tabbar = () => {
	const pathname = usePathname();
	const tabs = [
		{ icon: <TextSearchIcon />, name: 'Поиск', href: '/search' },
		{ icon: <HeartIcon />, name: 'Избранное', href: '/favorites' },
		{ icon: <LayersIcon />, name: 'Объявления', href: '/ads' },
		{ icon: <MessageCircle />, name: 'Сообщения', href: '/messages' },
		{ icon: <User />, name: 'Профиль', href: '/profile' },
	];
	return (
		<Tabs>
			{tabs.map((tab, index) => (
				<TabItem icon={tab.icon} name={tab.name} href={tab.href} key={index} active={pathname === tab.href}/>
			))}
		</Tabs>
	)
};
