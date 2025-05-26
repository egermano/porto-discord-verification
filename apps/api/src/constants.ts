import dotenv from "dotenv";

dotenv.config();

export const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET as string;
export const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL as string;

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;
export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID as string;
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET as string;

export const DATABASE_URL = process.env.DATABASE_URL as string;
export const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN as string;

export const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN as string;
export const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID as string;
export const DISCORD_ROLE_NAME = process.env.DISCORD_ROLE_NAME as string;