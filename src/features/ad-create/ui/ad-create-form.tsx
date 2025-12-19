'use client';
import { AdForm } from '@entities/ad';
import { Category } from '@entities/category';
import { FC, useCallback } from 'react';
import { CreateAdFormData, createAdSchema } from '../model/schema';

interface AdCreateFormProps {
	category: Category;
	onBack?: () => void;
}

export const AdCreateForm: FC<AdCreateFormProps> = ({ category }) => {
	const handleSubmit = useCallback((data: CreateAdFormData) => {
		console.log(data);
	}, []);

	return (
		<AdForm
			schema={createAdSchema}
			initialValues={{ category, media: [] }}
			onSubmit={handleSubmit}
		/>
	);
};
