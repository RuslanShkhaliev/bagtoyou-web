import { SuggestionList } from '@features/search/ui/SuggestionList';
import { ButtonClickEvent } from '@shared/types/events';
import { Button, InputGroupButton, SearchInput } from '@shared/ui';
import { Filter, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

export const SearchBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchText, setSearchText] = useState('');
	const searchInputRef = useRef<HTMLDivElement>(null);
	const [inputOffset, setInputOffset] = useState(0);

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : '';
		document.documentElement.style.overflow = isOpen ? 'hidden' : '';
	}, [isOpen]);
	useEffect(() => {
		if (!isOpen || !searchInputRef.current) return;

		const updatePosition = () => {
			const rect = searchInputRef.current!.getBoundingClientRect();
			setInputOffset(rect.bottom);
		};

		updatePosition();
		window.addEventListener('resize', updatePosition);

		return () => {
			window.removeEventListener('resize', updatePosition);
		};
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
		<div
			ref={searchInputRef}
			className={'flex gap-2 items-center'}
		>
			<div className={'flex gap-2 items-center w-full'}>
				<SearchInput
					right={renderAddon}
					value={searchText}
					placeholder={'Я ищу...'}
					onClick={() => setIsOpen(true)}
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
			{isOpen && <SuggestionList offsetY={inputOffset} />}
		</div>
	);
};
