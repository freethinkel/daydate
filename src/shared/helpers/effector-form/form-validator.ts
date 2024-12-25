import { type ValidationSchema } from './types';

export class FormValidator<T> {
	constructor(private schema?: ValidationSchema<T>) {}

	handleSubmit(form: T): Partial<Record<keyof T, string>> {
		const errors: Partial<Record<keyof T, string>> = {};

		for (const field in this.schema ?? {}) {
			const validator = this.schema?.[field as keyof T]?.beforeSubmit;
			if (validator) {
				const validators = Array.isArray(validator) ? validator : [validator];

				for (const validate of validators) {
					const error = validate(field as keyof T, form[field as keyof T], form);

					if (error) {
						errors[field as keyof T] = error;
						break;
					}
				}
			}
		}

		return errors;
	}

	handleChange(field: keyof T, form: T): string | undefined {
		const validator = this.schema?.[field]?.change;

		if (!validator) {
			return undefined;
		}

		const validators = Array.isArray(validator) ? validator : [validator];
		let error: string | undefined = undefined;

		for (const validate of validators) {
			error = validate(field, form[field], form);
			if (error) {
				break;
			}
		}

		return error;
	}
}
