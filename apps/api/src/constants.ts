import dotenv from "dotenv";

dotenv.config();

export const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET as string;
export const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL as string;

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;

export const DATABASE_URL = process.env.DATABASE_URL as string;
export const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN as string;
