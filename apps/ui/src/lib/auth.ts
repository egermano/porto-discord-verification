import { jwt } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

export let token: string | null = null;

export const authClient = createAuthClient({
  baseURL: "http://localhost:3333/", // The base URL of your auth server
  plugins: [jwt()],
});

export const { useSession, signIn, signUp, signOut } = authClient;

export const retriveToken = async () => {
  const a = authClient.getSession();
  return jwt;
};
