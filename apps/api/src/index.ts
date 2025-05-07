import { auth } from "@/auth";
import { Hono } from "hono";
const app = new Hono();

app.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));

// get auth links
// get token

// post user
// patch user

app.fire();
