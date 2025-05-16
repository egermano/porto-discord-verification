import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "@/constants";
import { db } from "@/db/db";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";

export const auth = betterAuth({
  database: { db, type: "sqlite" },
  trustedOrigins: ["http://localhost:3000"],
  socialProviders: {
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [jwt()],
});
