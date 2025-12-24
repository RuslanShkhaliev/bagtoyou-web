import { InputChangeEvent } from '@shared/types/events';
import { BottomSheet } from '@shared/ui/bottom-sheet';
import { InputSearch } from '@shared/ui/input-search';
import { Item, ItemGroup } from '@shared/ui/item';
import { ScrollArea } from '@shared/ui/scroll-area';
import currencyCodes from 'currency-codes';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';
import { FC, useMemo, useState } from 'react';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from './input-group';

interface InputPriceProps extends React.ComponentProps<'input'> {
	currency?: string | null;
	value: number;
	onChangeValue: (value: number) => void;
	onChangeCurrency: (currency: string) => void;
}

const codes = currencyCodes.codes();

export const InputPrice: FC<InputPriceProps> = ({
	placeholder,
	currency,
	onChangeCurrency,
	onChangeValue,
	value,
	...inputProps
}) => {
	const [currencyQuery, setCurrencyQuery] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const displayCurrency = currency || codes[0];

	const filteredCurrencies = useMemo(
		() =>
			codes.filter((code) =>
				code.toLowerCase().includes(currencyQuery.toLowerCase()),
			),
		[currencyQuery],
	);

	const displayValue = value;
	const handleChange = (e: InputChangeEvent) => {
		onChangeValue(e.target.value);
	};

	const handleSelectCurrency = (code: string) => {
		onChangeCurrency(code);
		setIsOpen(false);
	};
	const toggleModal = () => {
		setIsOpen(!isOpen);
	};
	return (
		<InputGroup>
			<InputGroupInput
				placeholder={placeholder}
				onInput={handleChange}
				value={displayValue}
				type={'number'}
				inputMode={'decimal'}
				{...inputProps}
			/>
			<InputGroupAddon align='inline-end'>
				<InputGroupButton
					variant='ghost'
					className='!pr-1.5 text-xs'
					onClick={toggleModal}
				>
					{displayCurrency} <ChevronDownIcon className='size-3' />
				</InputGroupButton>
				<BottomSheet
					open={isOpen}
					snapPoints={[0.6]}
					onOpenChange={setIsOpen}
				>
					<div className={'sticky top-0 bg-black mb-3'}>
						<InputSearch
							placeholder={'Поиск...'}
							value={currencyQuery}
							onChangeText={setCurrencyQuery}
						/>
					</div>
					<ScrollArea className={'h-100 overflow-auto'}>
						<ItemGroup>
							{filteredCurrencies.map((code, index) => (
								<Item
									key={index}
									onClick={() => handleSelectCurrency(code)}
								>
									{code}
								</Item>
							))}
						</ItemGroup>
					</ScrollArea>
				</BottomSheet>
			</InputGroupAddon>
		</InputGroup>
	);
};
