import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "../env.ts";
import { schema } from "./schema/index.ts";

export const sql = postgres(env.DATABASE_URL)

const result  = await sql`SELECT 'Hello' as message`;

console.log(result); // Should log "Hello"

export const db = drizzle(sql, {
    schema,
    casing: "snake_case",
});