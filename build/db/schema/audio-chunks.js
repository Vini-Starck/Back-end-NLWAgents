"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioChunks = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const rooms_1 = require("./rooms");
exports.audioChunks = (0, pg_core_1.pgTable)('audio_chunks', {
    id: (0, pg_core_1.uuid)().primaryKey().defaultRandom(),
    roomId: (0, pg_core_1.uuid)()
        .references(() => rooms_1.rooms.id)
        .notNull(),
    transcription: (0, pg_core_1.text)().notNull(),
    embeddings: (0, pg_core_1.vector)({ dimensions: 768 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)().defaultNow().notNull(),
});
