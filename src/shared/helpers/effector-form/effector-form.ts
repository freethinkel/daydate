import { createEvent, createStore, sample } from 'effector';
import type { ExtractValue, FormErrors, Options } from './types';
import { FormValidator } from './form-validator';

export const createEffectorForm = <T, D = unknown>(initialValues: T, options?: Options<T, D>) => {
	const $formValues = createStore<T>(initialValues);
	const $formErrors = createStore<FormErrors<T>>({});
	const $isValid = $formErrors.map(
		(errors) => Object.keys(errors).filter((key) => errors[key as keyof T]).length === 0
	);
	const validators = options?.validators;
	const formValidator = new FormValidator<T>(validators);

	const handleChange = createEvent<
		ExtractValue<{
			[K in keyof T]: T[K];
		}>
	>();
	const handleSubmit = createEvent();
	const startSubmitValidation = createEvent();
	const endSubmitValidation = createEvent();

	sample({
		clock: handleChange,
		source: $formValues,
		fn: (formValues, { name, value }) => ({
			...formValues,
			[name]: value
		}),
		target: $formValues
	});

	sample({
		clock: handleChange,
		source: { formValues: $formValues, formErrors: $formErrors },
		fn: ({ formValues, formErrors }, { name, value }) => {
			const error = formValidator.handleChange(name, { ...formValues, [name]: value });

			if (error) {
				return {
					...formErrors,
					[name]: error
				};
			}

			return formErrors;
		},
		target: $formErrors
	});
	sample({
		clock: handleSubmit,
		target: startSubmitValidation
	});
	sample({
		clock: startSubmitValidation,
		source: { formValues: $formValues },
		fn: ({ formValues }) => {
			return formValidator.handleSubmit(formValues);
		},
		target: [$formErrors, endSubmitValidation]
	});

	if (options?.submitFx) {
		sample({
			clock: endSubmitValidation,
			filter: $isValid,
			source: $formValues,
			target: options.submitFx
		});

		$formValues.reset(options.submitFx.done);
		$formErrors.reset(options.submitFx.done);
	}

	return {
		$formValues,
		$formErrors,
		$isValid,
		handleChange,
		handleSubmit
	};
};
