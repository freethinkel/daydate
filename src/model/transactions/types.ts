export type TransactionEntry = {
	id: string;
	name: string;
	date: Date;
	amount: number;
};

export type Form = {
	name: string;
	amount: number;
	type: 'income' | 'expense';
};

export type TransactionType = 'all' | 'income' | 'expense';
