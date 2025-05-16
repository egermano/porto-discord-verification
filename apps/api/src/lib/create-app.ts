import type { auth } from "@/lib/auth";
import { Hono } from "hono";

export type AuthType = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
};

export function createRouter() {
  return new Hono<{ Bindings: AuthType }>({
    strict: false,
  });
}

export default function createApp() {
  const app = createRouter();

  return app;
}
