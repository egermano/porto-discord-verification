import { Session, User } from "@/lib/auth";
import { authRouter, sessionMiddleware } from "@/routes/auth";
import { userRoute } from "@/routes/user";
import { cors } from "hono/cors";
import { Hono } from "hono/quick";

const app = new Hono<{
  Variables: {
    user: User | null;
    session: Session | null;
  };
}>();

// CORS
app.use(
  "/api/*", // or replace with "*" to enable cors for all routes
  cors({
    origin: "http://localhost:3000", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "PUT", "PATCH", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

// Session Middleware
app.use("*", sessionMiddleware);

const routes = [authRouter, userRoute] as const;

routes.forEach((route) => {
  app.basePath("/api").route("/", route);
});

export type AppType = (typeof routes)[number];

// get auth links
// get token

// post user
// patch user

app.fire();
