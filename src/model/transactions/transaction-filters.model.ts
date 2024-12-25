import { createEvent, createStore, sample } from 'effector';
import type { TransactionType } from './types';

export const $type = createStore<TransactionType>('all');

export const changeType = createEvent<TransactionType>();

sample({
	clock: changeType,
	target: $type
});
