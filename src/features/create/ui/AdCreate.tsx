'use client';
import { createBrowserClient } from '@api/supabase';
import { CreateAd, FormValues, ListingForm } from '@entities/listing';
import { createListing } from '@entities/listing/api/createListing';
import { uploadMedia } from '@entities/listing/api/uploadMedia';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import z from 'zod';

const useCreateAd = () => {
	const supabase = createBrowserClient();

	return useMutation({
		mutationFn: async ({ media, ...dto }: CreateAd & { media: File[] }) => {
			const ad = await createListing(supabase, dto);

			if (media?.length) {
				try {
					const mediaUrls = await Promise.all(media.map(uploadMedia));

					const { error } = await supabase.from('ad_media').upsert({
						ad_id: ad.id,
						media_url: mediaUrls,
					});

					if (error) {
						throw error;
					}
				} catch (error) {
					throw error;
				}
			}

			return ad.id;
		},
	});
};

const MAX_DESCRIPTION_LENGTH = 450;
const MAX_TITLE_LENGTH = 50;
const MIN_TITLE_LENGTH = 3;
const MIN_DESCRIPTION_LENGTH = 20;
const createSchema = z.object({
	title: z
		.string({ message: 'Введите заголовок' })
		.min(MIN_TITLE_LENGTH, 'Минимум 3 символа')
		.max(MAX_TITLE_LENGTH),
	description: z
		.string({ message: 'Введите описание' })
		.min(MIN_DESCRIPTION_LENGTH, 'Минимум 20 символов')
		.max(MAX_DESCRIPTION_LENGTH, 'Превышена максимальная длина'),
	price: z.string({ message: 'Введите цену' }).min(0).default(''),
	category: z.object(
		{
			id: z.number(),
			name: z.string(),
		},
		{ message: 'Выберите категорию' },
	),
});
export const AdCreatePage: FC = () => {
	const { mutate: createMutate } = useCreateAd();
	const router = useRouter();
	const handleSubmit = (formData: FormValues) => {
		console.log('handle submit');
		createMutate(
			{
				title: formData.title,
				description: formData.description,
				price: formData.price,
				category_id: formData.category.id,
				currency: formData.currency,
				media: [],
			},
			{
				onSuccess: (id) => {
					router.replace(`/listings/${id}`);
				},
				onError: (error) => {
					console.log('error', error);
				},
			},
		);
	};

	return (
		<ListingForm
			schema={createSchema}
			onSubmit={handleSubmit}
		/>
	);
};
