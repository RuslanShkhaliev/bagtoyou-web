import { cn } from '@lib/utils';
import { Button } from '@shared/ui';
import type { FC } from 'react';
import { memo } from 'react';
import type { Tab } from './types';

interface TabBarProps {
	tabs: Tab[];
	activeIndex: number;
	onTabChange: (index: number) => void;
}

export const TabBar: FC<TabBarProps> = memo(
	({ tabs, activeIndex, onTabChange }) => {
		return (
			<div className='flex overflow-x-auto gap-1 border-b border-border'>
				{tabs.map((tab, index) => {
					const isActive = activeIndex === index;

					return (
						<Button
							key={tab.key}
							variant='ghost'
							className={cn(
								'relative rounded-none border-b-2 border-transparent py-2 pr-0 transition-colors',
								isActive
									? 'border-primary text-primary'
									: 'text-muted-foreground hover:text-foreground',
							)}
							onClick={() => onTabChange(index)}
						>
							{tab.icon && (
								<span className='mr-2'>{tab.icon}</span>
							)}
							{tab.title}
							{tab.badge !== undefined && tab.badge > 0 && (
								<span className='ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground'>
									{tab.badge}
								</span>
							)}
						</Button>
					);
				})}
			</div>
		);
	},
);

TabBar.displayName = 'TabBar';
