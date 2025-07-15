"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.sql = void 0;
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres_1 = __importDefault(require("postgres"));
const env_1 = require("../env");
const index_1 = require("./schema/index");
exports.sql = (0, postgres_1.default)(env_1.env.DATABASE_URL);
exports.db = (0, postgres_js_1.drizzle)(exports.sql, {
    schema: index_1.schema,
    casing: 'snake_case',
});
