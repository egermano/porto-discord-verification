import dotenv from "dotenv";

dotenv.config();

export const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET!;
export const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL!;

export const DB_FILE_NAME = process.env.DB_FILE_NAME!;

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID!;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET!;

export const DATABASE_URL = process.env.DATABASE_URL!;
export const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN!;
