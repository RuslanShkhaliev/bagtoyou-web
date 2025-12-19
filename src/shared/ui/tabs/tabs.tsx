'use client';

import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { TabBar } from './tab-bar';
import { TabContent } from './tab-content';
import type { Tab, TabScenes } from './types';

interface TabsProps {
	tabs: Tab[];
	scenes: TabScenes;
	defaultIndex?: number;
	onTabChange?: (index: number) => void;
}

export const Tabs: FC<TabsProps> = ({
	tabs,
	scenes,
	defaultIndex = 0,
	onTabChange,
}) => {
	const [activeIndex, setActiveIndex] = useState(defaultIndex);

	const handleTabChange = useCallback(
		(index: number) => {
			setActiveIndex(index);
			onTabChange?.(index);
		},
		[onTabChange],
	);

	return (
		<div className='flex w-full flex-col'>
			<TabBar
				tabs={tabs}
				activeIndex={activeIndex}
				onTabChange={handleTabChange}
			/>
			<TabContent
				tabs={tabs}
				activeIndex={activeIndex}
				scenes={scenes}
			/>
		</div>
	);
};
