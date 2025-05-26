import { auth } from "@/lib/auth";
import { createRouter } from "@/lib/create-app";
import { Context, Next } from "hono";

const authRouter = createRouter();

authRouter.on(["POST", "GET"], "/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

const sessionMiddleware = async (
  c: Context<
    {
      Variables: {
        user: User | null;
        session: Session | null;
      };
    },
    "*",
    {}
  >,
  next: Next
) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
};

export { authRouter, sessionMiddleware };

export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session.session;
