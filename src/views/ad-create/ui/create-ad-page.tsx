'use client';

import { Category } from '@entities/category';
import { CategorySelect } from '@features/ad-category-select';
import { AdCreateForm } from '@features/ad-create';
import { BottomSheet } from '@shared/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const CreateAdPage = () => {
	const [selectedCategory, setSelectedCategory] = useState<Category | null>(
		null,
	);
	const router = useRouter();

	const handleClose = () => {
		if (selectedCategory) {
			setSelectedCategory(null);
		} else {
			router.back();
		}
	};
	const handleSelectCategory = (category: Category) => {
		setSelectedCategory(category);
	};

	return (
		<BottomSheet
			open={true}
			onClose={handleClose}
		>
			{selectedCategory ? (
				<AdCreateForm category={selectedCategory} />
			) : (
				<CategorySelect
					onClose={handleClose}
					onSelect={handleSelectCategory}
				/>
			)}
		</BottomSheet>
	);
};
