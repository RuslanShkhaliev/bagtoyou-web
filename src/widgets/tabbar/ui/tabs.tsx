import { TabItemProps } from '@widgets/tabbar/ui/tab-link';
import { FC } from 'react';

interface TabsProps {
	tabs: TabItemProps[];
	renderTab: (tab: TabItemProps, index: number) => React.ReactNode;
}
export const Tabs: FC<TabsProps> = ({ tabs, renderTab }) => {
	return (
		<div className='fixed bottom-0 left-0 w-full h-[50px] backdrop-blur-2xl border-t-1 flex items-center'>
			<div className='flex items-center w-full'>
				{tabs.map((item, index) => (
					<div
						key={index}
						className={'flex-1 h-11'}
					>
						{renderTab(item, index)}
					</div>
				))}
			</div>
		</div>
	);
};
