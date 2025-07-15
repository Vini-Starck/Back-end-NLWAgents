"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomsRoute = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const connection_1 = require("../../db/connection");
const index_1 = require("../../db/schema/index");
const getRoomsRoute = (app) => {
    app.get('/rooms', async () => {
        const results = await connection_1.db
            .select({
            id: index_1.schema.rooms.id,
            name: index_1.schema.rooms.name,
            createdAt: index_1.schema.rooms.createdAt,
            questionsCount: (0, drizzle_orm_1.count)(index_1.schema.questions.id),
        })
            .from(index_1.schema.rooms)
            .leftJoin(index_1.schema.questions, (0, drizzle_orm_1.eq)(index_1.schema.questions.roomId, index_1.schema.rooms.id))
            .groupBy(index_1.schema.rooms.id)
            .orderBy(index_1.schema.rooms.createdAt);
        return results;
    });
};
exports.getRoomsRoute = getRoomsRoute;
