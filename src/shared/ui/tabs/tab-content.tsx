import type { FC } from 'react';
import { memo, useMemo } from 'react';
import type { Tab, TabScenes } from './types';

interface TabContentProps {
	tabs: Tab[];
	activeIndex: number;
	scenes: TabScenes;
}

export const TabContent: FC<TabContentProps> = memo(
	({ tabs, activeIndex, scenes }) => {
		const renderedScenes = useMemo(() => {
			return tabs.map((tab, index) => {
				const Scene = scenes[tab.key];

				if (!Scene) {
					console.warn(`Scene for tab "${tab.key}" not found`);
					return null;
				}

				return (
					<div
						key={tab.key}
						className={index === activeIndex ? 'block' : 'hidden'}
					>
						<Scene
							tab={tab}
							index={index}
						/>
					</div>
				);
			});
		}, [tabs, scenes, activeIndex]);

		return <div className='mt-4'>{renderedScenes}</div>;
	},
);

TabContent.displayName = 'TabContent';
