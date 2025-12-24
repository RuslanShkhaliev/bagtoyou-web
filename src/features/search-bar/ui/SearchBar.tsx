import { ButtonClickEvent } from '@shared/types/events';
import {
	Button,
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@shared/ui';
import { Filter, Search, X } from 'lucide-react';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';

export const SearchBar = () => {
	const [isFocused, setIsFocused] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [searchText, setSearchText] = useState('');
	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : '';
	}, [isOpen]);

	const exitSearch = () => {
		setIsOpen(false);
	};

	const handleClear = (e: ButtonClickEvent) => {
		console.log('clear search');
	};

	const openFilters = (e: ButtonClickEvent) => {
		console.log('open filters');
	};

	const renderAddon = useMemo(() => {
		if (!isOpen) {
			return (
				<InputGroupButton
					size={'sm'}
					onClick={openFilters}
				>
					<Filter />
				</InputGroupButton>
			);
		} else if (searchText) {
			return (
				<InputGroupButton
					size={'sm'}
					onClick={handleClear}
				>
					<X />
				</InputGroupButton>
			);
		}
	}, [isOpen, searchText]);

	return (
		<Popover
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<PopoverTrigger asChild>
				<div className={'flex gap-2 items-center'}>
					<SearchInput
						addon={renderAddon}
						value={searchText}
						onChange={setSearchText}
					/>
					{isOpen && (
						<Button
							onClick={exitSearch}
							variant={'ghost'}
							className={'text-green-400'}
						>
							Отменить
						</Button>
					)}
				</div>
			</PopoverTrigger>

			<PopoverContent className={'w-full'}>
				<div className={'h-screen w-screen'}>history</div>
			</PopoverContent>
		</Popover>
	);
};

interface SearchInputProps {
	value: string;
	addon: ReactNode;
	onChange: (value: string) => void;
}
const SearchInput: FC<SearchInputProps> = ({ value, addon, onChange }) => {
	return (
		<InputGroup>
			<InputGroupAddon>
				<Search />
			</InputGroupAddon>
			<InputGroupInput
				placeholder={'Поиск по объявлениям'}
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			<InputGroupAddon align={'inline-end'}>{addon}</InputGroupAddon>
		</InputGroup>
	);
};
