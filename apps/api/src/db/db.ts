import { Kysely } from "kysely";
import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "../constants";
import { AzionDialect } from "./AzionDialect";

export const db = new Kysely({
  dialect: new AzionDialect({
    url: DATABASE_URL,
    token: DATABASE_AUTH_TOKEN,
  }),
});
