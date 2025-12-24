'use client';

import { AdCard, AdModel } from '@entities/ad/ui/AdCard';
import { Category, useGetCategories } from '@entities/category';
import { SearchBar } from '@features/search-bar';
import { Badge } from '@shared/ui';
import { useGetAds } from '@views/main/api/getAds';
import { Locations } from '@widgets/location-picker';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const SearchPage = () => {
	const { data: ads, isLoading, isError } = useGetAds();
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
	const handleToggleFavorite = () => {};
	const handleOpenListing = (id: number) => {
		router.push(`/ad/${id}`);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!ads) {
		return <div>No ads found.</div>;
	}

	return (
		<div>
			<header className='border-b sticky top-0 bg-background/95 backdrop-blur z-10 mb-4'>
				<div className=' mx-auto px-2 py-4'>
					<div className='flex flex-col md:flex-row gap-4 md:items-center md:justify-between'>
						<div>
							<h1 className='text-primary mb-1'>Барахолка</h1>
							<p className='text-muted-foreground'>
								Купить и продать вещи легко
							</p>
						</div>
					</div>

					<div className='my-4 relative'>
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
				{ads.map((ad) => (
					<Link
						key={ad.id}
						href={`/ads/${ad.id}`}
					>
						<AdCard
							data={ad as unknown as AdModel}
							onToggleFavorite={handleToggleFavorite}
						/>
					</Link>
				))}
			</div>
		</div>
	);
};
