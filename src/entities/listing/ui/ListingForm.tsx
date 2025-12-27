'use client';
import { Category } from '@entities/category';
import { ListingImage } from '@entities/listing';
import { SelectCategory } from '@features/category-select';
import { Button, FieldError, FormField, Input, Textarea } from '@shared/ui';
import { InputPrice } from '@shared/ui/input-price';
import { useForm } from '@tanstack/react-form';
import { ImagePicker } from '@widgets/media-picker';
import { FC, useState } from 'react';
import { ZodSchema } from 'zod';

export interface FormValues {
	title: string;
	description: string;
	currency: string;
	price: number;
	category: Category;
}

interface AdFormProps {
	values?: Partial<FormValues>;
	images?: ListingImage[];
	schema: ZodSchema;
	// onImagePick: (files: filese[]) => void;
	// onImageRemove: (image: AdImage) => void;
	onSubmit: (formValues: FormValues) => void;
}

// TODO добавить флаг договорной цены

export const AdForm: FC<AdFormProps> = ({
	values,
	images,
	schema,
	onSubmit,
}) => {
	const form = useForm({
		defaultValues: {
			title: values?.title || '',
			description: values?.description || '',
			currency: values?.currency,
			price: values?.price || 0,
			category: values?.category || null,
		},
		/*validators: {
			onSubmit: schema,
		},*/
		onSubmit: ({ value }) => {
			console.log({ value }, 'value');
			onSubmit(value as FormValues);
		},
	});
	const [imageToUpload] = useState();
	const mediaCount = images?.length || 0;

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit(e);
			}}
			className='flex flex-col gap-6 h-full'
		>
			<div>
				<FieldError errors={form.state.errors} />
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
						description={`Максимальная длина ${field.state.value.length}/50 символов`}
						required
					>
						<Input
							id={field.name}
							name={field.name}
							onBlur={field.handleBlur}
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder='Например: iPhone 14 Pro 256GB'
						/>
					</FormField>
				)}
			</form.Field>
			<form.Field name={'category'}>
				{(field) => (
					<FormField
						invalid={
							field.state.meta.isTouched &&
							!field.state.meta.isValid
						}
						errors={field.state.meta.errors}
						label={'Категория'}
						required
					>
						<SelectCategory
							value={field.state.value}
							onChange={field.handleChange}
						/>
					</FormField>
				)}
			</form.Field>

			{/* Фотографии */}
			<FormField
				label={`Фотографии (${mediaCount}/5)`}
				required
			>
				<ImagePicker value={images} />
			</FormField>

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
							className='max-h-48'
						/>
					</FormField>
				)}
			</form.Field>

			<form.Field name='price'>
				{(field) => (
					<form.Field name={'currency'}>
						{(currencyField) => (
							<FormField
								htmlFor={field.name}
								label='Цена'
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
									maxLength={15}
									currency={currencyField.state.value}
									onChangeCurrency={
										currencyField.handleChange
									}
									onChangeValue={field.handleChange}
									placeholder='Цена'
								/>
							</FormField>
						)}
					</form.Field>
				)}
			</form.Field>
			<Button
				className={'mt-auto'}
				type='submit'
			>
				Создать объявление
			</Button>
		</form>
	);
};
