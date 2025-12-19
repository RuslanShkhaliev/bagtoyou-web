'use client';
import { Ad } from '@entities/ad';
import { Category } from '@entities/category';
import { CreateAdFormData } from '@features/ad-create/model/schema';
import { Button, FormField, Input, Textarea } from '@shared/ui';
import { InputPrice } from '@shared/ui/input-price';
import { useForm } from '@tanstack/react-form';
import { MediaPicker } from '@widgets/media-picker';
import { FC } from 'react';
import { ZodSchema } from 'zod/v3';

interface FormValues extends Partial<Ad> {
	price: number;
	category: Category;
	media: string[];
}
interface AdFormProps {
	initialValues: FormValues;
	schema: ZodSchema;
	onSubmit: (formValues: CreateAdFormData) => void;
}

// TODO добавить флаг договорной цены

export const AdForm: FC<AdFormProps> = ({
	initialValues,
	schema,
	onSubmit,
}) => {
	const form = useForm({
		defaultValues: { ...initialValues, price: 0 },
		validators: {
			onChange: schema,
		},
		onSubmit: ({ value }) => {
			onSubmit(value);
		},
	});
	const handleChangeMedia = (files: string[]) => {
		form.setFieldValue('media', files);
	};

	const mediaCount = form.getFieldValue('media')?.length || 0;

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className='flex flex-col gap-6 h-full'
		>
			{/* Выбранная категория */}
			<div className='rounded-lg border bg-muted/50 p-3'>
				<div className='text-xs text-muted-foreground mb-1'>
					Категория
				</div>
				<div className='font-medium'>{initialValues.category.name}</div>
			</div>

			{/* Название */}
			<form.Field name='title'>
				{(field) => (
					<FormField
						htmlFor={field.name}
						label='Название объявления'
						invalid={
							field.state.meta.isTouched &&
							!field.state.meta.isValid
						}
						errors={field.state.meta.errors}
						required
					>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder='Например: iPhone 14 Pro 256GB'
						/>
					</FormField>
				)}
			</form.Field>

			{/* Фотографии */}
			<form.Field name='media'>
				{(field) => (
					<FormField
						htmlFor={field.name}
						label={`Фотографии (${mediaCount}/5)`}
						invalid={
							field.state.meta.isTouched &&
							!field.state.meta.isValid
						}
						errors={field.state.meta.errors}
						required
					>
						<MediaPicker
							media={field.state.value}
							onChange={handleChangeMedia}
						/>
					</FormField>
				)}
			</form.Field>

			{/* Описание */}
			<form.Field name='description'>
				{(field) => (
					<FormField
						htmlFor={field.name}
						label='Описание'
						invalid={
							field.state.meta.isTouched &&
							!field.state.meta.isValid
						}
						errors={field.state.meta.errors}
						required
					>
						<Textarea
							id={field.name}
							name={field.name}
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder='Опишите ваше объявление...'
							rows={5}
						/>
					</FormField>
				)}
			</form.Field>

			<form.Field name='price'>
				{(field) => (
					<FormField
						htmlFor={field.name}
						label='Условия продажи'
						invalid={
							field.state.meta.isTouched &&
							!field.state.meta.isValid
						}
						errors={field.state.meta.errors}
						required
					>
						<InputPrice
							id={field.name}
							name={field.name}
							type={'number'}
							value={field.state.value}
							currency={form.getFieldValue('currency')}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder='Цена'
						/>
					</FormField>
				)}
			</form.Field>

			{/* Кнопки */}
			<div className='flex gap-3 mt-auto'>
				<Button
					type='submit'
					className='flex-1'
				>
					Создать объявление
				</Button>
			</div>
		</form>
	);
};
