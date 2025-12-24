'use client';

import { Button, FormField, Input, InputPassword } from '@shared/ui';
import { useForm } from '@tanstack/react-form';
import { FC, memo } from 'react';
import toast from 'react-hot-toast';
import { useSignUp } from '../api/use-sign-up';
import { registerFormSchema, RegisterValuesType } from '../model/schema';

const defaultValues: RegisterValuesType = {
	name: '',
	email: '',
	password: '',
};

interface RegisterFormProps {
	onSubmit?: () => void;
}
export const RegisterForm: FC<RegisterFormProps> = memo(({ onSubmit }) => {
	const { mutate: signUpMutate, isPending } = useSignUp();

	const form = useForm({
		defaultValues,
		validators: {
			onChange: registerFormSchema,
		},
		onSubmit: ({ value }) => {
			signUpMutate(value, {
				onSuccess: () => {
					toast.success('Verification email sent. Check your mail.');
					onSubmit?.();
				},
				onError: (error) => {
					toast.error(error.message);
				},
			});
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
			className='w-full flex flex-col gap-y-4'
		>
			<form.Field name='name'>
				{(field) => (
					<FormField
						htmlFor={field.name}
						label={'Username'}
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
							disabled={isPending}
							type={'text'}
							onChange={(e) => field.handleChange(e.target.value)}
							required
						/>
					</FormField>
				)}
			</form.Field>
			<form.Field name='email'>
				{(field) => (
					<FormField
						htmlFor={field.name}
						label={'Email'}
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
							disabled={isPending}
							type={'email'}
							placeholder='hello@sarathadhi.com'
							onChange={(e) => field.handleChange(e.target.value)}
							required
						/>
					</FormField>
				)}
			</form.Field>
			<form.Field name='password'>
				{(field) => (
					<FormField
						htmlFor={field.name}
						label={'Password'}
						invalid={
							field.state.meta.isTouched &&
							!field.state.meta.isValid
						}
						errors={field.state.meta.errors}
						required
					>
						<InputPassword
							id={field.name}
							name={field.name}
							value={field.state.value}
							disabled={isPending}
							onChange={(e) => field.handleChange(e.target.value)}
							required
						/>
					</FormField>
				)}
			</form.Field>

			<Button
				type={'submit'}
				loading={isPending}
			>
				Register
			</Button>
		</form>
	);
});

export default RegisterForm;
