import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const config = defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "turso",
  verbose: true,
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
    authToken: process.env.DATABASE_AUTH_TOKEN as string,
  },
});

console.log("drizzle.config.ts", config);

export default config;
