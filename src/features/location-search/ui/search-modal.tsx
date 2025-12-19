'use client';

import { SheetRef, useSheetController } from '@hooks/use-sheet-controller';
import { GeoDbModel } from '@lib/geoDb';
import { BottomSheet, InputSearch } from '@shared/ui';
import { forwardRef, useEffect, useState } from 'react';
import { useSearchCities } from '../api/use-get-cities';
import { Loader } from './loader';
import { LocationItem } from './location-item';

interface LocationSearchSheetProps {
	value?: GeoDbModel | null;
	onSelect?: (value: GeoDbModel) => void;
	onClose?: () => void;
}

export const SearchModal = forwardRef<SheetRef, LocationSearchSheetProps>(
	({ value, onSelect, onClose }, ref) => {
		const [isVisible, setIsVisible] = useSheetController(ref);
		const [inputValue, setInputValue] = useState<string>(value?.city || '');
		const { data, isLoading, search } = useSearchCities();

		useEffect(() => {
			setInputValue(() => value?.city || '');
		}, [value]);

		const handleSearch = (query: string) => {
			setInputValue(query);
			search(query);
		};
		const handleSelect = (location: GeoDbModel) => () => {
			onSelect?.(location);
			setIsVisible(false);
		};

		const handleClose = () => {
			onClose?.();
		};
		const handleClear = () => {
			setInputValue('');
		};

		return (
			<BottomSheet
				open={isVisible}
				onClose={handleClose}
				onOpenChange={setIsVisible}
				snapPoints={[1]}
			>
				<div>
					<InputSearch
						autoFocus
						value={inputValue}
						placeholder={'Start typing city name'}
						onChangeText={handleSearch}
						onClear={handleClear}
					/>
				</div>
				<Loader value={isLoading} />
				{!data || data?.length === 0 ? (
					<div className={'px-4 py-3'}>
						<div className={'text-center'}>No results found.</div>
					</div>
				) : (
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
				)}
			</BottomSheet>
		);
	},
);

SearchModal.displayName = 'LocationSearchSheet';
