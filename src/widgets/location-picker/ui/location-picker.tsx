import { Locations } from '@/widgets/location-picker/model/types';
import { LocationSearch } from '@features/location-search';
import { GeoDbModel } from '@lib/geoDb';
import { ButtonClickEvent } from '@shared/types/events';
import { Card, CardContent, ReverseButton } from '@shared/ui';
import { PlaneLandingIcon, PlaneTakeoffIcon, Search } from 'lucide-react';
import React from 'react';

interface LocationPickerProps {
	locations: Locations;
	onChange: (locations: Locations) => void;
	canReverse?: boolean;
}
export const LocationPicker = ({
	locations,
	onChange,
}: LocationPickerProps) => {
	const handleChangeFrom = (location: GeoDbModel | null) => {
		onChange({
			...locations,
			from: location,
		});
	};

	const handleChangeTo = (location: GeoDbModel | null) => {
		onChange({
			...locations,
			to: location,
		});
	};

	const handleReverse = (e: ButtonClickEvent) => {
		e.stopPropagation();
		onChange({
			from: locations.to,
			to: locations.from,
		});
	};
	return (
		<>
			<Card className={'relative py-2'}>
				<CardContent className={'flex items-stretch px-2 gap-2'}>
					<div className={'flex flex-col justify-center'}>
						<Search size={20} />
					</div>
					<div className='flex flex-col flex-1 items-center justify-center gap-3'>
						<LocationSearch
							icon={<PlaneTakeoffIcon />}
							placeholder='From'
							value={locations.from}
							onChange={handleChangeFrom}
						/>
						<LocationSearch
							icon={<PlaneLandingIcon />}
							placeholder='To'
							value={locations.to}
							onChange={handleChangeTo}
						/>
						<div className={'absolute z-10'}>
							<ReverseButton onClick={handleReverse} />
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
};
