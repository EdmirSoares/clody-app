import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/shared/lib/schema.ts",
  out: "./src/shared/lib/migrations",
  dialect: "sqlite",
  driver: "expo",
});
