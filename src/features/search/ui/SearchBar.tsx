import { SuggestionList } from '@features/search-bar/ui/SuggestionList';
import { ButtonClickEvent } from '@shared/types/events';
import {
	Button,
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@shared/ui';
import { Filter, Search, X } from 'lucide-react';
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react';

export const SearchBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchText, setSearchText] = useState('');
	const searchInputRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : '';
	}, [isOpen]);
	useEffect(() => {
		document.documentElement.style.setProperty(
			'--search-bar-y-position',
			searchInputRef.current!.offsetTop + 'px',
		);
	}, []);

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
		<div
			ref={searchInputRef}
			className={'flex gap-2 items-center'}
		>
			<SearchInput
				addon={renderAddon}
				value={searchText}
				onFocus={() => setIsOpen(true)}
				onBlur={() => setIsOpen(false)}
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
			{true && <SuggestionList />}
		</div>
	);
};

interface SearchInputProps {
	value: string;
	addon: ReactNode;
	onFocus: () => void;
	onBlur: () => void;
	onChange: (value: string) => void;
}
const SearchInput: FC<SearchInputProps> = ({
	value,
	addon,
	onChange,
	onBlur,
	onFocus,
}) => {
	return (
		<InputGroup>
			<InputGroupAddon>
				<Search />
			</InputGroupAddon>
			<InputGroupInput
				placeholder={'Поиск по объявлениям'}
				value={value}
				onFocus={onFocus}
				onBlur={onBlur}
				onChange={(e) => onChange(e.target.value)}
			/>
			<InputGroupAddon align={'inline-end'}>{addon}</InputGroupAddon>
		</InputGroup>
	);
};
