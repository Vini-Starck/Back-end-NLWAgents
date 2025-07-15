"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomChunksRoute = void 0;
const zod_1 = require("zod");
const connection_1 = require("../../db/connection");
const index_1 = require("../../db/schema/index");
const drizzle_orm_1 = require("drizzle-orm");
// Defina o esquema dos parâmetros da rota
const paramsSchema = zod_1.z.object({
    roomId: zod_1.z.string(),
});
// Agora tipamos explicitamente a função de rota
const getRoomChunksRoute = (app) => {
    app.get(// Aqui estamos tipando os parâmetros da rota
    '/rooms/:roomId/chunks', {
        schema: {
            params: paramsSchema, // Defina o esquema de parâmetros
        },
    }, async (request, reply) => {
        // Agora, o `request.params` já será do tipo `{ roomId: string }`
        const { roomId } = request.params;
        const chunks = await connection_1.db
            .select({
            id: index_1.schema.audioChunks.id,
            transcription: index_1.schema.audioChunks.transcription,
            createdAt: index_1.schema.audioChunks.createdAt,
        })
            .from(index_1.schema.audioChunks)
            .where((0, drizzle_orm_1.eq)(index_1.schema.audioChunks.roomId, roomId))
            .orderBy(index_1.schema.audioChunks.createdAt);
        return reply.send({ chunks });
    });
};
exports.getRoomChunksRoute = getRoomChunksRoute;
