import { createEvent, createStore, sample } from "effector";
import type { BudgetEntry, Form } from "./types";
import { createBudgetFx, deleteBudgetFx, loadBudgetFx } from "./api";
import * as appModel from "../app";
import { createEffectorForm } from "@/shared/helpers/effector-form";

export const $budget = createStore<Array<BudgetEntry>>([]);
export const $loading = loadBudgetFx.pending;

export const { $formValues, handleChange, handleSubmit } = createEffectorForm<
  Form,
  BudgetEntry
>(
  {
    name: "",
    amount: 0,
  },
  {
    submitFx: createBudgetFx,
  }
);

export const loadBudget = createEvent();
export const createBudget = createEvent();
export const updateBudget = createEvent<BudgetEntry>();
export const deleteBudget = createEvent<string>();

sample({
  clock: loadBudget,
  source: appModel.$selectedMonth,
  fn: (month) => ({ month }),
  target: loadBudgetFx,
});

sample({
  source: loadBudgetFx.doneData,
  target: $budget,
});

sample({
  clock: appModel.selectMonth,
  target: appModel.$selectedMonth,
});

sample({
  source: appModel.$selectedMonth,
  target: loadBudget,
});

sample({
  clock: createBudgetFx.doneData,
  source: $budget,
  fn: (budget, newEntry) => [...budget, newEntry],
  target: $budget,
});

sample({
  clock: deleteBudget,
  source: $budget,
  fn: (budget, id) => budget.find((budget) => budget.id === id)!,
  target: deleteBudgetFx,
});

sample({
  clock: deleteBudgetFx.done,
  source: $budget,
  fn: (budget, { params }) => budget.filter((budget) => budget !== params),
  target: $budget,
});
