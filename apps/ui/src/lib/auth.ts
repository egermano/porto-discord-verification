import { jwt } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

export let token: string | null = null;

export const authClient = createAuthClient({
  baseURL: "http://localhost:3333", // The base URL of your auth server
  basePath: "/api/auth", // The base path of your auth server
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },
  advanced: {
    defaultCookieAttributes: {
      secure: true,
      sameSite: "none", // Allows CORS-based cookie sharing across subdomains
      partitioned: true, // New browser standards will mandate this for foreign cookies
    },
  },
  fetchOptions: {
    credentials: "include", // Include cookies in requests
  },
});

export const { useSession, signIn, signUp, signOut } = authClient;

export const retriveToken = async () => {
  const a = authClient.getSession();
  return jwt;
};
