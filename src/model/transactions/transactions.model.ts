import { createEvent, createStore, sample } from "effector";
import type { Form, TransactionEntry } from "./types";
import {
  createTransactionFx,
  deleteTransactionFx,
  loadPrevMonthTransactionsFx,
  loadTransactionsFx,
} from "./api";
import * as appModel from "../app";
import { createEffectorForm } from "@/shared/helpers/effector-form";

export const $transactions = createStore<Array<TransactionEntry>>([]);
export const $prevMonthTransactions = createStore<Array<TransactionEntry>>([]);
export const $loading = loadTransactionsFx.pending;
export const { $formValues, handleChange, handleSubmit } = createEffectorForm(
  {
    name: "",
    amount: 0,
    type: "expense",
  } satisfies Form,
  {
    submitFx: createTransactionFx,
  }
);

export const loadTransactions = createEvent();
export const createTransaction = createEvent<TransactionEntry>();
export const updateTransaction = createEvent<TransactionEntry>();
export const deleteTransaction = createEvent<string>();

sample({
  clock: loadTransactions,
  source: { month: appModel.$selectedMonth },
  fn: ({ month }) => ({ month }),
  target: loadTransactionsFx,
});

sample({
  clock: loadTransactions,
  source: { month: appModel.$selectedMonth },
  fn: ({ month }) => ({ month }),
  target: loadPrevMonthTransactionsFx,
});

sample({
  source: loadTransactionsFx.doneData,
  target: $transactions,
});

sample({
  source: appModel.$selectedMonth,
  target: loadTransactions,
});

sample({
  clock: createTransactionFx.doneData,
  source: $transactions,
  fn: (transactions, newEntry) => [...transactions, newEntry],
  target: $transactions,
});

sample({
  clock: loadPrevMonthTransactionsFx.doneData,
  target: $prevMonthTransactions,
});

sample({
  clock: deleteTransaction,
  source: $transactions,
  fn: (transactions, id) =>
    transactions.find((transaction) => transaction.id === id)!,
  target: deleteTransactionFx,
});

sample({
  clock: deleteTransactionFx.done,
  source: $transactions,
  fn: (transactions, { params }) =>
    transactions.filter((transaction) => transaction !== params),
  target: $transactions,
});
