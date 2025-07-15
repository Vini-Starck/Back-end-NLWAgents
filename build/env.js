"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(3333),
    DATABASE_URL: zod_1.z.string().url().startsWith('postgresql://'),
    GEMINI_API_KEY: zod_1.z.string(),
});
const _env = envSchema.safeParse(process.env);
if (!_env.success) {
    console.error('❌ Invalid environment variables!', _env.error.format());
    throw new Error('Invalid environment variables.');
}
exports.env = _env.data;
