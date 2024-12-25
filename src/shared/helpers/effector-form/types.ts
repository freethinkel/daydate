import type { Effect } from 'effector';

export type ExtractValue<T> = Required<{
	[K in keyof T]: {
		name: K;
		value: T[K];
	};
}>[keyof T];

export type FormErrors<T> = Partial<Record<keyof T, string>>;

type ValidationCallback<K extends keyof T, T> = (key: K, value: T[K], form: T) => string;

type FieldValidation<K extends keyof T, T> =
	| ValidationCallback<K, T>
	| Array<ValidationCallback<K, T>>;

export type ValidationSchema<T> = {
	[K in keyof T]?: {
		blur?: FieldValidation<K, T>;
		beforeSubmit?: FieldValidation<K, T>;
		change?: FieldValidation<K, T>;
	};
};

export type Options<T, D> = {
	submitFx: Effect<T, D>;
	validators?: ValidationSchema<T>;
};
