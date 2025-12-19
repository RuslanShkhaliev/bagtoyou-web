'use client';
import {
	TabCreateAd,
	TabCreateAdProps,
} from '@widgets/tabbar/ui/tab-create-ad';
import { TabItemProps, TabLink } from '@widgets/tabbar/ui/tab-link';
import { Tabs } from '@widgets/tabbar/ui/tabs';
import { HeartIcon, Mail, Plus, TextSearchIcon, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

export const Tabbar = () => {
	const pathname = usePathname();

	const tabs: Array<TabItemProps | TabCreateAdProps> = [
		{
			type: 'link',
			icon: <TextSearchIcon />,
			name: 'Поиск',
			href: '/',
		},
		{
			type: 'link',
			icon: <HeartIcon />,
			name: 'Избранное',
			href: '/favorites',
		},
		{ type: 'action', icon: <Plus />, name: 'Создать' },
		{
			type: 'link',
			icon: <Mail />,
			name: 'Сообщения',
			href: '/messages',
		},
		{ type: 'link', icon: <User />, name: 'Профиль', href: '/account' },
	];

	const renderTab = useCallback((tab: TabItemProps) => {
		if (tab.type === 'link') {
			return (
				<TabLink
					icon={tab.icon}
					name={tab.name}
					href={tab.href}
					active={pathname === tab.href}
				/>
			);
		}
		if (tab.type === 'action') {
			return (
				<TabCreateAd
					icon={tab.icon}
					title={tab.name}
				/>
			);
		}
	});

	return (
		<Tabs
			tabs={tabs}
			renderTab={renderTab}
		/>
	);
};
