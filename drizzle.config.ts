import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/model/db/schema.ts",
  // driver: "libsql",
  dialect: "sqlite",
  dbCredentials: {
    url: ":memory:",
  },
  verbose: false,
  strict: true,
  out: "./src-tauri/migrations",
});
