import { Search } from 'lucide-react';
import { FC, ReactNode } from 'react';
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group';

interface SearchInputProps {
	value: string;
	right?: ReactNode;
	placeholder?: string;
	onClick?: () => void;
	onFocus?: () => void;
	onBlur?: () => void;
	onChange: (value: string) => void;
}
export const SearchInput: FC<SearchInputProps> = ({
	value,
	right,
	placeholder,
	onChange,
	onBlur,
	onClick,
	onFocus,
}) => {
	return (
		<InputGroup onClick={onClick}>
			<InputGroupAddon>
				<Search />
			</InputGroupAddon>
			<InputGroupInput
				placeholder={placeholder}
				value={value}
				onFocus={onFocus}
				onBlur={onBlur}
				onChange={(e) => onChange(e.target.value)}
			/>
			{right && (
				<InputGroupAddon align={'inline-end'}>{right}</InputGroupAddon>
			)}
		</InputGroup>
	);
};
