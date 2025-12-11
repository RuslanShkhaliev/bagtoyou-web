import {Spinner} from '@shared/ui';
import {FC} from 'react';


interface LoaderProps {
	value: boolean
}

export const Loader: FC<LoaderProps> = ({value}) => {
	if (!value) {
		return null;
	}

	return <div className={'flex items-center gap-2'}><Spinner/> Loading...</div>
};
