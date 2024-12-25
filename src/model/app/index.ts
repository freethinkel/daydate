import { createEvent, createStore } from 'effector';

export const $selectedMonth = createStore(new Date());
export const $settings = createStore({});

export const selectMonth = createEvent<Date>();
