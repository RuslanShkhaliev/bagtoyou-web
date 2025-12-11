import {ClickEvent} from '@shared/types/events';
import {FormField, InputGroup, InputGroupAddon, InputGroupInput} from '@shared/ui';
import {X} from 'lucide-react';
import {FC} from 'react';


interface LocationFieldProps {
	value: string;
    onClick: () => void;
    onClear?: () => void;
    error?: string;
	placeholder?: string;
}

export const LocationField: FC<LocationFieldProps> = ({value, onClick, onClear, error}) => {
	const handleClear = (e: ClickEvent) => {
		e.stopPropagation()
		onClear?.();
	}
	return (
		<FormField errors={error ? [error] : undefined} invalid={!!error}>
			<InputGroup>
				<InputGroupInput
					placeholder="From"
					readOnly
					value={value}
					onClick={onClick}
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
	)
}
