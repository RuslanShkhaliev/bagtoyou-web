'use client';

import {ModalControllerRef, useModalController} from '@hooks/use-modal-controller';
import {GeoDbModel} from '@lib/geoDb';
import {InputChangeEvent} from '@shared/types/events';
import {BottomSheet, InputSearch} from '@shared/ui';
import {forwardRef, useState} from 'react';
import {useSearchCities} from '../api/use-get-cities';
import {LocationTarget} from '../model/types';
import {Loader} from './loader';
import {LocationItem} from './location-item';


interface LocationSearchSheetProps {
	city?: GeoDbModel | null;
	target?: LocationTarget;
    onSelect: (city: GeoDbModel, target?: LocationTarget) => void;
}

export const LocationSearchSheet = forwardRef<ModalControllerRef, LocationSearchSheetProps>(({
	city,
	target,
	onSelect
}, ref) => {
	const [isVisible, setIsVisible] = useModalController(ref)
	const [inputValue, setInputValue] = useState<string>(city?.city ?? '')

	const {data, search, isLoading} = useSearchCities()

	const handleSearch = (e: InputChangeEvent) =>  {
		const value = e.target.value
		setInputValue(value)
		search(value)
	}
	const handleSelect = (city: GeoDbModel) => () => {
		setInputValue(city.city)
		onSelect?.(city, target)
		setIsVisible(false)
    }

	return (
		<BottomSheet open={isVisible} onOpenChange={setIsVisible} snapPoints={[1]}>
			<div>
				<InputSearch value={inputValue} placeholder={'Start typing city name'} onChange={handleSearch}/>
			</div>
			<Loader value={isLoading}/>
			{!data || data?.length === 0
			 ? <div>No cities found.</div>
			 : (
				 <div className={'py-3'}>
					 {data!.map((item) => (
						 <LocationItem
							 key={item.id}
							 city={item.city}
							 country={item.country}
							 onClick={handleSelect(item)}
						 />
					 ))}
				 </div>
			 )
			}
		</BottomSheet>
	)
})

LocationSearchSheet.displayName = 'LocationSearchSheet';
