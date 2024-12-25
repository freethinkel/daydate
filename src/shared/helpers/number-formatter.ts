export const formatAmount = (amount: number): string => {
	const value = new Intl.NumberFormat('en-US').format(amount === 0 ? 0 : amount);

	if (value === '0') {
		return '';
	}

	return value;
};

export const parseFormattedAmount = (amount: string): number => Number(amount.replace(/,+/gim, ''));
