import { auth } from "@/lib/auth";
import { createRouter } from "@/lib/create-app";
import { Hono } from "hono";

const app = new Hono();
const authRouter = createRouter();

authRouter.on(["POST", "GET"], "/auth/**", (c) => {
  return auth.handler(c.req.raw);
});

const routes = [authRouter] as const;

routes.forEach((route) => {
  app.basePath("/api").route("/", route);
});

export type AppType = (typeof routes)[number];

// get auth links
// get token

// post user
// patch user

app.fire();
