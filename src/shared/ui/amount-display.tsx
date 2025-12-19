import { cn } from '@lib/utils';
import { amountFormatter } from '@utils/amountFormatter';
import * as React from 'react';
import { useMemo } from 'react';

interface AmountDisplayProps extends React.HTMLAttributes<HTMLSpanElement> {
	amount: string | number;
	currency?: string;
	showCurrency?: boolean;
	locale?: string;
	formatOptions?: Intl.NumberFormatOptions;
}

export const AmountDisplay = React.forwardRef<
	HTMLSpanElement,
	AmountDisplayProps
>(
	(
		{
			amount,
			currency = '₽',
			showCurrency = true,
			locale,
			formatOptions,
			className,
			...props
		},
		ref,
	) => {
		const formatter = useMemo(() => {
			if (locale || formatOptions) {
				return new (amountFormatter.constructor as any)(
					locale,
					formatOptions,
				);
			}
			return amountFormatter;
		}, [locale, formatOptions]);

		const formattedAmount = useMemo(() => {
			return formatter.format(amount);
		}, [amount, formatter]);

		return (
			<span
				ref={ref}
				className={cn('tabular-nums', className)}
				{...props}
			>
				{formattedAmount}
				{showCurrency && currency && (
					<span className='ml-1'>{currency}</span>
				)}
			</span>
		);
	},
);

AmountDisplay.displayName = 'AmountDisplay';
