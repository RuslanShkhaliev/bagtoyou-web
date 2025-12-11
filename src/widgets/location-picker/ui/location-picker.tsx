import {Locations, LocationsErrors} from '@/widgets/location-picker/model/types';
import {LocationSelector} from '@/widgets/location-picker/ui/location-selector';
import {LocationSearchSheet} from '@features/location-search';
import {LocationTarget} from '@features/location-search/model/types';
import {ModalControllerRef} from '@hooks/use-modal-controller';
import {GeoDbModel} from '@lib/geoDb';
import React, {useRef} from 'react';


interface LocationPickerProps {
	locations: Locations
	onChange: (locations: Locations) => void;
	canReverse?: boolean;
	errors?: LocationsErrors;
	error?: string;
}
export const LocationPicker = ({
	locations,
	onChange,
	errors,
	error,
	canReverse = true,
}: LocationPickerProps) => {
	const locationSheetRef = useRef<ModalControllerRef>(null)

	const locationTarget = useRef<LocationTarget | null>(null)

	const handleSelect = (location: GeoDbModel) => {
		onChange({
			...locations,
			[locationTarget.current!]: location,
		})
	}

	const onReverse = () => {
		onChange({
			from: locations.to,
            to: locations.from,
		})
	};

	const selectFrom = () => {
		locationTarget.current = 'from';
		locationSheetRef.current?.open()
	}
	const selectTo = () => {
		locationTarget.current = 'to';
		locationSheetRef.current?.open()
    }

	const inValid = error || errors?.from || errors?.to;

	return (
		<>
			<LocationSelector
				onReverse={onReverse}
				selectFrom={selectFrom}
				selectTo={selectTo}
				fromValue={locations.from?.city ?? ''}
				toValue={locations.to?.city ?? ''}
			/>
			<LocationSearchSheet ref={locationSheetRef} onSelect={handleSelect}/>
		</>
	);
};
