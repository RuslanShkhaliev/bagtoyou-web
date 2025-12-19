import { ClickEvent } from '@shared/types/events';
import {
	FormField,
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@shared/ui';
import { X } from 'lucide-react';
import { FC } from 'react';

interface LocationFieldProps {
	value: string;
	onClick: () => void;
	onClear?: () => void;
	error?: string;
	invalid?: boolean;
	placeholder?: string;
	disabled?: boolean;
	icon?: React.ReactElement;
}

export const LocationField: FC<LocationFieldProps> = ({
	value,
	placeholder,
	onClick,
	onClear,
	error,
	disabled,
	invalid,
	icon,
}) => {
	const handleClear = (e: ClickEvent) => {
		e.stopPropagation();
		onClear?.();
	};
	return (
		<FormField
			errors={error ? [new Error(error)] : undefined}
			invalid={!!error || invalid}
		>
			<InputGroup>
				{icon && <InputGroupAddon>{icon}</InputGroupAddon>}
				<InputGroupInput
					placeholder={placeholder}
					readOnly
					value={value}
					onClick={onClick}
					disabled={disabled}
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
