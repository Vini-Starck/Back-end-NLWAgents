"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomQuestions = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const v4_1 = require("zod/v4");
const connection_1 = require("../../db/connection");
const index_1 = require("../../db/schema/index");
const getRoomQuestions = (app) => {
    app.get('/rooms/:roomId/questions', {
        schema: {
            params: v4_1.z.object({
                roomId: v4_1.z.string(),
            }),
        },
    }, async (request) => {
        const { roomId } = request.params;
        const result = await connection_1.db
            .select({
            id: index_1.schema.questions.id,
            question: index_1.schema.questions.question,
            answer: index_1.schema.questions.answer,
            createdAt: index_1.schema.questions.createdAt,
        })
            .from(index_1.schema.questions)
            .where((0, drizzle_orm_1.eq)(index_1.schema.questions.roomId, roomId))
            .orderBy((0, drizzle_orm_1.desc)(index_1.schema.questions.createdAt));
        return result;
    });
};
exports.getRoomQuestions = getRoomQuestions;
