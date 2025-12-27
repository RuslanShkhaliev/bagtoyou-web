'use client';

import { appRoutes } from '@config/routes';
import { Category, useGetCategories } from '@entities/category';
import { ListingCard } from '@entities/listing';
import { SearchBar } from '@features/search';
import { Badge } from '@shared/ui';
import { Locations } from '@widgets/location-picker';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useGetListings } from '../api/getAds';

export const SearchPage = () => {
	const { data: ads, isLoading, isError } = useGetListings();
	const { data: categories, isLoading: loadingCategories } =
		useGetCategories();
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null,
	);

	const [filters, setFilters] = useState<{ [key: string]: any }>({
		location_from: null,
		location_to: null,
	});

	const handleChange = ({ to, from }: Locations) => {
		setFilters((prev) => ({
			...prev,
			location_from: from,
			location_to: to,
		}));
	};

	const router = useRouter();
	const handleOpenListing = (id: number) => {
		router.push(appRoutes.listings.details(id));
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!ads) {
		return <div>No ads found.</div>;
	}

	return (
		<div className={'flex flex-col gap-4'}>
			<header className='border-b top-0 bg-background/95 backdrop-blur z-10'>
				<div className='mx-auto px-2 py-4'>
					<div className={' mb-4'}>
						<SearchBar />
					</div>

					{/* Categories */}
					<div className='flex gap-2 overflow-x-auto pb-2'>
						{categories?.map((category) => (
							<Badge
								key={category.id}
								variant={
									selectedCategory?.id === category.id
										? 'default'
										: 'outline'
								}
								className='cursor-pointer whitespace-nowrap hover:bg-primary/90 hover:text-primary-foreground'
								onClick={() => setSelectedCategory(category)}
							>
								{category.name}
							</Badge>
						))}
					</div>
				</div>
			</header>
			<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 px-2'>
				{ads.map((adPreview) => (
					<ListingCard
						key={adPreview.id}
						onClick={() => handleOpenListing(adPreview.id)}
						data={adPreview}
					/>
				))}
			</div>
		</div>
	);
};
