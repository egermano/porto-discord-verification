import {
  BETTER_AUTH_SECRET,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} from "@/constants";
import { db } from "@/db/db";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: { db, type: "sqlite" },
  secret: BETTER_AUTH_SECRET,
  baseURL: "http://localhost:3333", // The base URL of your auth server
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      partitioned: true, // New browser standards will mandate this for foreign cookies
    },
  },
  verification: {
    disableCleanup: true,
  },
  // TODO: add a envvar
  appName: "Porto - Discord Verification",
  trustedOrigins: ["http://localhost:3000"],
  socialProviders: {
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    },
    discord: {
      clientId: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      leadForm: {
        type: "string",
        default: {},
      },
    },
  },
});
