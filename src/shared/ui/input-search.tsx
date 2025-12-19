import { AppInput, AppInputProps } from '@shared/ui/app-input';
import { Search } from 'lucide-react';
import { FC } from 'react';

export const InputSearch: FC<AppInputProps> = (props) => {
	return (
		<AppInput
			{...props}
			icon={<Search />}
		/>
	);
};
