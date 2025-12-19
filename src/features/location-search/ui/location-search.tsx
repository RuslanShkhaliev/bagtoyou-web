import { SheetRef } from '@hooks/use-sheet-controller';
import { GeoDbModel } from '@lib/geoDb';
import { FC, useRef } from 'react';
import { SearchModal } from './search-modal';
import { TriggerInput } from './trigger-input';

interface LocationSearchProps {
	onChange?: (location: GeoDbModel | null) => void;
	value?: GeoDbModel | null;
	placeholder?: string;
	icon?: React.ReactElement;
}

export const LocationSearch: FC<LocationSearchProps> = ({
	value,
	onChange,
	icon,
	placeholder = 'Search a city',
}) => {
	const locationSheetRef = useRef<SheetRef>(null);

	const handleClick = () => {
		locationSheetRef.current?.open();
	};

	const handleSelect = (location: GeoDbModel) => {
		onChange?.(location);
		locationSheetRef.current?.close();
	};

	const handleClear = () => {
		onChange?.(null);
	};
	return (
		<div className={'flex flex-1 w-full'}>
			<TriggerInput
				icon={icon}
				value={value?.city ?? ''}
				placeholder={placeholder}
				onClick={handleClick}
				onClear={handleClear}
			/>
			<SearchModal
				ref={locationSheetRef}
				value={value}
				onSelect={handleSelect}
			/>
		</div>
	);
};
