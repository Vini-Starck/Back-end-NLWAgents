"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rooms = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.rooms = (0, pg_core_1.pgTable)('rooms', {
    id: (0, pg_core_1.uuid)().primaryKey().defaultRandom(),
    name: (0, pg_core_1.text)().notNull(),
    description: (0, pg_core_1.text)(),
    createdAt: (0, pg_core_1.timestamp)().defaultNow().notNull(),
});
