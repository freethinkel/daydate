import { createEffect } from "effector";
import type { BudgetEntry, Form } from "./types";
import { db } from "../db/database";
import { and, eq, gt, lt } from "drizzle-orm";
import { budgetTable } from "../db/schema";

const mapDbToModel = (entry: {
  date: number;
  id: number;
  name: string;
  amount: number;
}): BudgetEntry => ({
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

  const res = await db.query.budgetTable.findMany({
    where: and(
      gt(budgetTable.date, startOfMonth.getTime()),
      lt(budgetTable.date, endOfMonth.getTime())
    ),
  });

  return res.map(mapDbToModel);
});

export const createBudgetFx = createEffect<Form, BudgetEntry>(async (form) => {
  const [{ id }] = await db
    .insert(budgetTable)
    .values({
      amount: Math.abs(form.amount),
      name: form.name,
      date: new Date().getTime(),
    })
    .returning();

  const res = await db.query.budgetTable.findFirst({
    where: eq(budgetTable.id, id),
  });

  return mapDbToModel(res!);
});

export const deleteBudgetFx = createEffect(async (budget: BudgetEntry) => {
  await db.delete(budgetTable).where(eq(budgetTable.id, parseInt(budget.id)));
});
