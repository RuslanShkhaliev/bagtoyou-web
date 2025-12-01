import {Field, FieldDescription, FieldError, FieldLabel} from '@ui/field';
import {FC, PropsWithChildren} from 'react';

type FormFieldProps = PropsWithChildren<{
	htmlFor?: string;
	label?: string;
	invalid?: boolean;
	errors?: Array<{ message?: string } | undefined>;
	description?: string;
	required?: boolean;
}>

export const FormField: FC<FormFieldProps> = ({htmlFor, invalid, label,errors, description, required, children}) => {
	return (
		<Field id={htmlFor} data-invalid={invalid}>
			{label && (
				<FieldLabel htmlFor={htmlFor}>
					{label}
					{required && <span className="text-red-500">*</span> }
				</FieldLabel>
				)
			}
			{children}
			{Boolean(errors) && <FieldError errors={errors}/>}
			{!errors && description && <FieldDescription>{description}</FieldDescription>}
		</Field>
	)
};
