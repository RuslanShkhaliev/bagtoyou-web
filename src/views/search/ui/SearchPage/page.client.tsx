'use client';

import {LocationPicker, Locations} from '@/widgets/location-picker';
import {AdCard} from '@entities/ad';
import {useGetAds} from '@views/search/api/getAds';
import {useState} from 'react';

export const SearchPage = () => {
	const {data: ads, isLoading, isError} = useGetAds()

	const [filters, setFilters] = useState<{ [key: string]: any }>({
		location_from: null,
		location_to: null,
	})


	const handleChange = ({to, from}: Locations) => {
		setFilters((prev) => ({
			...prev,
			location_from: from,
            location_to: to,
		}))
	}


	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!ads) {
		return <div>No ads found.</div>;
	}

	return (
		<div className={'px-2 pt-4'}>
			<div className={'mb-4 sticky top-0 z-10'}>
				<LocationPicker
					locations={{
						to: filters.location_to,
						from: filters.location_from,
					}}
					onChange={handleChange}
				/>
			</div>
			<div className="flex flex-col gap-3">
				{ads.map((ad) => (
					<AdCard key={ad.id} ad={ad}></AdCard>
				))}
			</div>
		</div>
	)
};
