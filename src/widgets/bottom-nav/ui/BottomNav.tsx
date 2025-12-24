'use client';

import { LayoutGrid, MessageCircle, Plus, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLayoutEffect, useRef } from 'react';

interface BottomNavProps {
	unreadChats: number;
}

export function BottomNav({ unreadChats }: BottomNavProps) {
	const pathname = usePathname();
	const navItems = [
		{ href: '/', label: 'Главная', icon: LayoutGrid },
		{
			href: '/favorite',
			label: 'Избранное',
			icon: MessageCircle,
		},
		{ href: '/add', label: 'Добавить', icon: Plus, isAction: true },
		{
			href: '/chats',
			label: 'Чаты',
			icon: MessageCircle,
			badge: unreadChats,
		},
		{ href: '/account', label: 'Профиль', icon: User },
	];

	const bottomNavRef = useRef<HTMLElement>(null);
	useLayoutEffect(() => {
		if (bottomNavRef.current) {
			document.documentElement.style.setProperty(
				'--bottom-nav-height',
				`${bottomNavRef.current.offsetHeight}px`,
			);
		}
	}, []);

	return (
		<nav
			ref={bottomNavRef}
			className='fixed bottom-0 left-0 right-0 bg-background border-t md:hidden z-50'
		>
			<div className='flex items-center justify-around h-16'>
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = pathname.startsWith(item.href);

					if (item.isAction) {
						return (
							<Link
								key={item.href}
								href={item.href}
								className='flex flex-col items-center justify-center flex-1 h-full relative'
							>
								<div className='w-12 h-12 rounded-full bg-primary flex items-center justify-center -mt-6 shadow-lg'>
									<Icon className='h-6 w-6 text-primary-foreground' />
								</div>
								<span className='text-xs mt-1 text-primary'>
									{item.label}
								</span>
							</Link>
						);
					}

					return (
						<Link
							key={item.href}
							href={item.href}
							className={`flex flex-col items-center justify-center flex-1 h-full relative ${
								isActive
									? 'text-primary'
									: 'text-muted-foreground'
							}`}
						>
							<div className='relative'>
								<Icon className='h-6 w-6' />
								{item.badge && item.badge > 0 && (
									<span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
										{item.badge > 9 ? '9+' : item.badge}
									</span>
								)}
							</div>
							<span className='text-xs mt-1'>{item.label}</span>
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
