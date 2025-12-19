import { AmountFormatter } from '@/shared/utils/amountFormatter/AmountFormatter';

describe('AmountFormatter', () => {
	const formatter = new AmountFormatter();

	describe('format method', () => {
		it('should format integer numbers with space as thousands separator', () => {
			expect(formatter.format(1234)).toBe('1 234');
			expect(formatter.format(10000)).toBe('10 000');
			expect(formatter.format(1000000)).toBe('1 000 000');
		});

		it('should format decimal numbers with comma as decimal separator and two decimal places', () => {
			expect(formatter.format(1234.56)).toBe('1 234,56');
			expect(formatter.format(1234.567)).toBe('1 234,57');
			expect(formatter.format(1234.564)).toBe('1 234,56');
		});

		it('should format negative numbers', () => {
			expect(formatter.format(-1234.56)).toBe('-1 234,56');
			expect(formatter.format(-1000000)).toBe('-1 000 000');
		});

		it('should truncate trailing zeros', () => {
			expect(formatter.format(0.0)).toBe('0');
			expect(formatter.format(88.0)).toBe('88');
			expect(formatter.format(123.4)).toBe('123,4');
		});

		it('should handle string input and format it', () => {
			expect(formatter.format('1234.56')).toBe('1 234,56');
			expect(formatter.format('-1234.56')).toBe('-1 234,56');
			expect(formatter.format('1 234,56')).toBe('1 234,56');
		});

		it('should return "0" for undefined or non-numeric string input', () => {
			expect(formatter.format(undefined)).toBe('0');
			expect(formatter.format('invalid')).toBe('0');
			expect(formatter.format('')).toBe('0');
		});

		it('should return "0" for 0', () => {
			expect(formatter.format(0)).toBe('0');
		});
	});

	describe('parseFormatted method (static)', () => {
		it('should parse formatted string to plain number string (dot as decimal)', () => {
			expect(AmountFormatter.parseFormatted('$1 234.57')).toBe('1234.57');
			expect(AmountFormatter.parseFormatted('-$1 234 567')).toBe(
				'-1234567',
			);
		});

		it('should parse formatted string to plain number string (comma as decimal)', () => {
			expect(AmountFormatter.parseFormatted('1 234,56')).toBe('1234.56');
			expect(AmountFormatter.parseFormatted('€10.000,99')).toBe(
				'10000.99',
			);
		});

		it('should handle mixed separators and return plain number string', () => {
			expect(AmountFormatter.parseFormatted('1.234,56')).toBe('1234.56');
			expect(AmountFormatter.parseFormatted('1 234.567')).toBe(
				'1234.567',
			);
		});

		it('should return an empty string for invalid input that cannot be parsed', () => {
			expect(AmountFormatter.parseFormatted('abc')).toBe('');
			expect(AmountFormatter.parseFormatted('-.')).toBe('');
		});
	});
});
