"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questions = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const rooms_1 = require("./rooms");
exports.questions = (0, pg_core_1.pgTable)('questions', {
    id: (0, pg_core_1.uuid)().primaryKey().defaultRandom(),
    roomId: (0, pg_core_1.uuid)()
        .references(() => rooms_1.rooms.id)
        .notNull(),
    question: (0, pg_core_1.text)().notNull(),
    answer: (0, pg_core_1.text)(),
    createdAt: (0, pg_core_1.timestamp)().defaultNow().notNull(),
});
