export class AmountFormatter {
	public static parseFormatted(stringNumber: string): string {
		return stringNumber.replace(/[^\d,\.-]/g, '').replace(',', '.');
	}

	private readonly formatter: Intl.NumberFormat;

	constructor(locale = 'ru-RU', options?: Intl.NumberFormatOptions) {
		this.formatter = new Intl.NumberFormat(locale, {
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
			useGrouping: true,
			...options,
		});
	}

	public format = (amount: string | number = 0): string => {
		let numericAmount: number;

		if (typeof amount === 'string') {
			numericAmount = parseFloat(AmountFormatter.parseFormatted(amount));
			if (isNaN(numericAmount)) {
				numericAmount = 0;
			}
		} else {
			numericAmount = amount;
		}

		return this.formatter.format(numericAmount);
	};
}
