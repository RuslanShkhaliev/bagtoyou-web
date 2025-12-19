'use client';

import { RemoveProfile } from '@features/remove-profile';
import { List, ListItem } from '@shared/ui';
import { BaseSettings } from '@views/account/ui/base-settings';
import { ProfileSettings } from '@views/account/ui/profile-settings';
import { ChevronRight, Eye } from 'lucide-react';

export const AccountSettingsPage = () => {
	return (
		<div className='flex flex-col h-full'>
			<div className={'space-y-3 grow'}>
				<ProfileSettings />
				<BaseSettings />
				<List>
					<ListItem
						title={'Просмотр профиля'}
						description={'Так ваш профиль видят другие'}
						media={<Eye />}
						iconRight={<ChevronRight />}
					/>
				</List>
			</div>

			<div className={'mt-auto flex justify-center'}>
				<RemoveProfile />
			</div>
		</div>
	);
};
