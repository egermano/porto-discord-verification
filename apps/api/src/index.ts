import { auth } from "@/lib/auth";
import { createRouter } from "@/lib/create-app";
import { cors } from "hono/cors";
import { Hono } from "hono/quick";

const app = new Hono();
app.use(
	"/api/auth/*", // or replace with "*" to enable cors for all routes
	cors({
		origin: "http://localhost:3000", // replace with your origin
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);
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
