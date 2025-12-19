import { InputChangeEvent } from '@shared/types/events';
import { InputSearch } from '@shared/ui/input-search';
import { amountFormatter } from '@utils/amountFormatter';
import currencyCodes from 'currency-codes';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';
import { FC, useMemo, useState } from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './dropdown-menu';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from './input-group';

interface InputPriceProps extends React.ComponentProps<'input'> {
	currency?: string;
	value: string | number;
	onChangeValue: (value: string) => void;
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
	const displayCurrency = currency || codes[0];

	const filteredCurrencies = useMemo(
		() =>
			codes.filter((code) =>
				code.toLowerCase().includes(currencyQuery.toLowerCase()),
			),
		[currencyQuery],
	);

	const displayValue = amountFormatter.format(value);
	const handleChange = (e: InputChangeEvent) => {
		console.log(e.target.value, 'change');
		onChangeValue(amountFormatter.parse(e.target.value));
	};
	return (
		<InputGroup>
			<InputGroupInput
				placeholder={placeholder}
				onChange={handleChange}
				value={displayValue}
				{...inputProps}
			/>
			<InputGroupAddon align='inline-end'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<InputGroupButton
							variant='ghost'
							className='!pr-1.5 text-xs'
						>
							{displayCurrency}{' '}
							<ChevronDownIcon className='size-3' />
						</InputGroupButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						align='end'
						className='[--radius:0.95rem]'
					>
						<div className={'p-2'}>
							<InputSearch
								placeholder={'Поиск...'}
								value={currencyQuery}
								onChangeText={setCurrencyQuery}
							/>
						</div>
						<div className={'h-48 overflow-y-auto'}>
							{filteredCurrencies.map((code, index) => (
								<DropdownMenuItem
									key={index}
									onSelect={() => onChangeCurrency(code)}
								>
									{code}
								</DropdownMenuItem>
							))}
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			</InputGroupAddon>
		</InputGroup>
	);
};
