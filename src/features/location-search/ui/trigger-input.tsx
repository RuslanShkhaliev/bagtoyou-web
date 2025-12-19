import { AppInput } from '@shared/ui/app-input';
import { FC } from 'react';

interface TriggerInputProps {
	value: string | undefined;
	errors?: string;
	invalid?: boolean;
	placeholder?: string;
	disabled?: boolean;
	icon?: React.ReactElement;
	onClick: () => void;
	onClear?: () => void;
}

export const TriggerInput: FC<TriggerInputProps> = ({
	value,
	placeholder,
	onClick,
	onClear,
	errors,
	disabled,
	invalid,
	icon,
}) => {
	return (
		<AppInput
			value={value}
			icon={icon}
			invalid={invalid}
			errors={errors}
			placeholder={placeholder}
			readOnly
			onClick={onClick}
			onClear={onClear}
			disabled={disabled}
		/>
	);
};
