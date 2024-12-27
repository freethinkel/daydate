import { createEffect } from "effector";
import type { Form, TransactionEntry } from "./types";
import { db } from "../db/database";
import { transactionsTable } from "../db/schema";
import { and, eq, gt, lt } from "drizzle-orm";

const mapDbToModel = (entry: {
  date: number;
  id: number;
  name: string;
  amount: number;
}): TransactionEntry => ({
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

  const res = await db
    .select()
    .from(transactionsTable)
    .where(
      and(
        gt(transactionsTable.date, startOfMonth.getTime()),
        lt(transactionsTable.date, endOfMonth.getTime())
      )
    );

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
    const [{ insertedId }] = await db
      .insert(transactionsTable)
      .values({
        amount:
          form.type === "income"
            ? Math.abs(form.amount)
            : -Math.abs(form.amount),
        name: form.name,
        date: new Date().getTime(),
      })
      .returning({
        insertedId: transactionsTable.id,
      });

    const res = await db.query.transactionsTable.findFirst({
      where: eq(transactionsTable.id, insertedId),
    });

    return mapDbToModel(res!);
  }
);

export const deleteTransactionFx = createEffect(
  async (transaction: TransactionEntry) => {
    await db
      .delete(transactionsTable)
      .where(eq(transactionsTable.id, parseInt(transaction.id)));
  }
);
