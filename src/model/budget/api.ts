import { createEffect } from "effector";
import type { BudgetEntry, Form } from "./types";
import { exec, select } from "../base";

const mapDbToModel = (entry: any): BudgetEntry => ({
  ...entry,
  id: entry.id.toString(),
  date: new Date(entry.date),
});

export const loadBudgetFx = createEffect(async ({ month }: { month: Date }) => {
  const startOfMonth = new Date(
    month.getFullYear(),
    month.getMonth(),
    1,
    0,
    0,
    0,
    0
  );
  const endOfMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
    0,
    0,
    0,
    0
  );

  const res = (await select(
    "SELECT * FROM budget WHERE date > date($1) AND date < date($2)",
    [startOfMonth, endOfMonth]
  )) as any[];

  return res.map(mapDbToModel);
});

export const createBudgetFx = createEffect<Form, BudgetEntry>(async (form) => {
  const { lastInsertId } = await exec(
    `INSERT into budget (name, amount, date) VALUES ($1, $2, $3)`,
    [form.name, Math.abs(form.amount), new Date()]
  );
  const [newEntry] = (await select("SELECT * FROM budget WHERE id = $1", [
    lastInsertId,
  ])) as any[];

  console.log(newEntry);

  return mapDbToModel(newEntry);
});

export const deleteBudgetFx = createEffect(async (budget: BudgetEntry) => {
  exec(`DELETE from budget WHERE id = $1`, [budget.id]);
});
