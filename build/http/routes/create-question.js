"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuestionRoute = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const v4_1 = require("zod/v4");
const connection_1 = require("../../db/connection");
const index_1 = require("../../db/schema/index");
const gemini_1 = require("../../services/gemini");
const createQuestionRoute = (app) => {
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
        const embeddings = await (0, gemini_1.generateEmbeddings)(question);
        const embeddingsAsString = `[${embeddings.join(',')}]`;
        const chunks = await connection_1.db
            .select({
            id: index_1.schema.audioChunks.id,
            transcription: index_1.schema.audioChunks.transcription,
            similarity: (0, drizzle_orm_1.sql) `1 - (${index_1.schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`,
        })
            .from(index_1.schema.audioChunks)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(index_1.schema.audioChunks.roomId, roomId), (0, drizzle_orm_1.sql) `1 - (${index_1.schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector) > 0.7`))
            .orderBy((0, drizzle_orm_1.sql) `${index_1.schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector`)
            .limit(3);
        let answer = null;
        if (chunks.length > 0) {
            const transcriptions = chunks.map((chunk) => chunk.transcription);
            answer = await (0, gemini_1.generateAnswer)(question, transcriptions);
        }
        const result = await connection_1.db
            .insert(index_1.schema.questions)
            .values({ roomId, question, answer })
            .returning();
        const insertedQuestion = result[0];
        if (!insertedQuestion) {
            throw new Error('Failed to create new room.');
        }
        return reply.status(201).send({
            questionId: insertedQuestion.id,
            answer,
        });
    });
};
exports.createQuestionRoute = createQuestionRoute;
