import { useGetUserTabs } from '@/widgets/user-ads-tabs/api/useGetUserTabs';
import { SkeletonLoader } from '@/widgets/user-ads-tabs/ui/skeleton';
import { Tab, Tabs, TabScenes } from '@shared/ui';
import { UserAdsList } from '@widgets/user-ads-tabs/ui/user-ads-list';
import { useMemo } from 'react';

export const UserAdsTabs = () => {
	const { data, isLoading } = useGetUserTabs();
	const tabsConfig = useMemo(() => {
		if (!data) {
			return {
				scenes: {},
				tabs: [],
			};
		}

		return data.reduce(
			(tabsConfig, tab) => {
				tabsConfig.tabs.push({
					key: tab.status,
					title: tab.status,
					badge: tab.count,
				});

				tabsConfig.scenes[tab.status] = () => (
					<UserAdsList status={tab.status} />
				);

				return tabsConfig;
			},
			{
				scenes: {} as TabScenes,
				tabs: [] as Tab[],
			},
		);
	}, [data]);

	if (isLoading) {
		return (
			<div className={'px-2 py-4'}>
				<SkeletonLoader count={3} />
			</div>
		);
	}

	return (
		<Tabs
			tabs={tabsConfig.tabs}
			scenes={tabsConfig.scenes}
		/>
	);
};
