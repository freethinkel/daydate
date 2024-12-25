import { createEffect } from "effector";
import type { Form, TransactionEntry } from "./types";
import { exec, select } from "../base";

const mapDbToModel = (entry: any): TransactionEntry => ({
  ...entry,
  id: entry.id.toString(),
  date: new Date(entry.date),
});

const loadTransactions = async ({ month }: { month: Date }) => {
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
    "SELECT * FROM transactions WHERE date > date($1) AND date < date($2)",
    [startOfMonth, endOfMonth]
  )) as any[];

  return res.map(mapDbToModel);
};

export const loadTransactionsFx = createEffect(({ month }: { month: Date }) =>
  loadTransactions({ month })
);

export const loadPrevMonthTransactionsFx = createEffect(
  ({ month }: { month: Date }) =>
    loadTransactions({
      month: new Date(month.getFullYear(), month.getMonth() - 1),
    })
);

export const createTransactionFx = createEffect<Form, TransactionEntry>(
  async (form) => {
    const { lastInsertId } = await exec(
      `insert into transactions (name, amount, date) values ($1, $2, $3)`,
      [
        form.name,
        form.type === "income" ? Math.abs(form.amount) : -Math.abs(form.amount),
        new Date(),
      ]
    );
    const [newEntry] = (await select(
      "SELECT * FROM transactions WHERE id = $1",
      [lastInsertId]
    )) as any[];

    return mapDbToModel(newEntry);
  }
);

export const deleteTransactionFx = createEffect(
  async (transaction: TransactionEntry) => {
    exec(`DELETE from transactions WHERE id = $1`, [transaction.id]);
  }
);
