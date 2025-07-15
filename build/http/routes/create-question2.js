"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestionRoute2 = void 0;
const v4_1 = require("zod/v4");
const connection_1 = require("../../db/connection");
const index_1 = require("../../db/schema/index");
const geminiResponse_1 = require("../../services/geminiResponse");
const createQuestionRoute2 = (app) => {
    app.post('/rooms/:roomId/questions', {
        schema: {
            params: v4_1.z.object({
                roomId: v4_1.z.string(),
            }),
            body: v4_1.z.object({
                question: v4_1.z.string().min(1),
            }),
        },
    }, async (request, reply) => {
        const { roomId } = request.params;
        const { question } = request.body;
        // IA responde diretamente
        const answer = await (0, geminiResponse_1.generateAnswer)(question);
        const result = await connection_1.db
            .insert(index_1.schema.questions)
            .values({ roomId, question, answer })
            .returning();
        const insertedQuestion = result[0];
        if (!insertedQuestion) {
            throw new Error('Failed to create new question.');
        }
        return reply.status(201).send({
            questionId: insertedQuestion.id,
            answer,
        });
    });
};
exports.createQuestionRoute2 = createQuestionRoute2;
