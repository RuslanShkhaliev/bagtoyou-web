import { z } from 'zod';

export const createAdSchema = z.object({
	title: z
		.string()
		.min(3, 'Минимум 3 символа')
		.max(100, 'Максимум 100 символов'),
	description: z
		.string()
		.min(10, 'Минимум 10 символов')
		.max(1000, 'Максимум 1000 символов'),
	category_id: z.number(),
	media: z
		.array(z.instanceof(File))
		.min(1, 'Добавьте хотя бы одно фото')
		.max(5, 'Максимум 5 фотографий'),
});

export type CreateAdFormData = z.infer<typeof createAdSchema>;
