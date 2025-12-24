import { ClickEvent, InputChangeEvent } from '@shared/types/events';
import { FormField } from '@shared/ui/form-field';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@shared/ui/input-group';
import { X } from 'lucide-react';
import React, { FC, useId, useMemo } from 'react';

export interface AppInputProps extends React.ComponentProps<'input'> {
	label?: string;
	icon?: React.ReactElement;
	onClear?: () => void;
	errors?: (Error | string) | (Error | string)[];
	invalid?: boolean;
	onChangeText?: (value: string) => void;
}

export const AppInput: FC<AppInputProps> = ({
	value,
	label,
	icon,
	errors,
	invalid,
	onClear,
	onChangeText,
	onInput,
	...inputProps
}) => {
	const id = useId();
	const mappedErrors = useMemo(() => {
		const target = Array.isArray(errors) ? errors : [errors];

		return target.map((error) => {
			if (typeof error === 'string') return new Error(error);
			return error;
		});
	}, [errors]);

	const handleClear = (e: ClickEvent) => {
		e.stopPropagation();
		onClear?.();
	};

	const handleInput = (e: InputChangeEvent) => {
		onInput?.(e);
		onChangeText?.(e.target.value);
	};
	return (
		<FormField
			htmlFor={id}
			errors={mappedErrors}
			label={label}
			invalid={invalid}
		>
			<InputGroup>
				{icon && <InputGroupAddon>{icon}</InputGroupAddon>}
				<InputGroupInput
					id={id}
					value={value}
					onInput={handleInput}
					{...inputProps}
				/>
				{value && onClear && (
					<InputGroupAddon
						align={'inline-end'}
						onClick={handleClear}
					>
						<X size={15} />
					</InputGroupAddon>
				)}
			</InputGroup>
		</FormField>
	);
};
