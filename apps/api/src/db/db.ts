import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "@/constants";
import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle({
  connection: {
    url: DATABASE_URL,
    authToken: DATABASE_AUTH_TOKEN,
  },
});
