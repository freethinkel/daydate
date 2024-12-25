import Database from "@tauri-apps/plugin-sql";

const database: Promise<Database> = Database.load("sqlite:database.db");

export const exec = async (query: string, bindValues?: unknown[]) => {
  const db = await database;
  return db.execute(query, bindValues);
};

export const select = async (query: string, bindValues?: unknown[]) => {
  const db = await database;

  return db.select(query, bindValues);
};

// // sqlite. The path is relative to `tauri::api::path::BaseDirectory::AppConfig`.
// const db = await Database.load("sqlite:test.db");
// mysql
// const db = await Database.load('mysql://user:pass@host/database')
// // postgres
// const db = await Database.load('postgres://postgres:password@localhost/test')

// await db.execute('INSERT INTO ...')
