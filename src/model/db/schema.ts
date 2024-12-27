import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const transactionsTable = sqliteTable("transactions", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  amount: int().notNull(),
  date: int().notNull(),
  categoryId: int().references(() => budgetTable.id),
});

export const budgetTable = sqliteTable("budget", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  amount: int().notNull(),
  date: int().notNull(),
});

export const budgetRelation = relations(budgetTable, ({ many }) => ({
  transactions: many(transactionsTable),
}));
