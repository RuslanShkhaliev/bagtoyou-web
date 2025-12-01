"use client";

import {useSignIn} from '@features/auth/login/api/sign-in';
import {useForm} from '@tanstack/react-form';
import {Button} from '@ui/button';
import {FormField} from '@ui/FormField';
import {Input} from '@ui/input';
import {InputPassword} from '@ui/InputPassword';
import {useRouter} from 'next/navigation';
import toast from 'react-hot-toast';
import {loginFormSchema, LoginSchema} from '../model/schema';


const defaultValues: LoginSchema = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const router = useRouter();
	const {mutate: loginMutate, isPending} = useSignIn()


  const form = useForm({
	  defaultValues,
	  validators: {onChange: loginFormSchema},
	  onSubmit: ({ value }) => {
		  loginMutate(value, {
			  onSuccess: () => {
				  toast.success("Login successful");
				  router.refresh();
			  },
			  onError: (error) => {
				  toast.error(error?.message)
			  }
		  })
	  }
	})



  return (
      <form
		  onSubmit={(e) => {
			  e.preventDefault()
			  form.handleSubmit()
		  }}
		  className="w-full flex flex-col gap-y-4"
	  >
		  <form.Field name='email'>
			  {(field) => (
				  <FormField
					  htmlFor={field.name}
					  label={'Email'}
					  invalid={field.state.meta.isTouched && !field.state.meta.isValid}
					  errors={field.state.meta.errors}
					  required
				  >
					  <Input
						  id={field.name}
						  name={field.name}
						  value={field.state.value}
						  type={'email'}
						  placeholder="hello@sarathadhi.com"

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
					  invalid={field.state.meta.isTouched && !field.state.meta.isValid}
					  errors={field.state.meta.errors}
					  required
				  >
					  <InputPassword
						  id={field.name}
						  name={field.name}
						  value={field.state.value}
						  onChange={(e) => field.handleChange(e.target.value)}
						  required
					  />
				  </FormField>
			  )}
		  </form.Field>
        <Button>Login</Button>
      </form>
  );
};

