"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAudioRoute = void 0;
const v4_1 = require("zod/v4");
const connection_1 = require("../../db/connection");
const index_1 = require("../../db/schema/index");
const gemini_1 = require("../../services/gemini");
const uploadAudioRoute = (app) => {
    app.post('/rooms/:roomId/audio', {
        schema: {
            params: v4_1.z.object({
                roomId: v4_1.z.string(),
            }),
        },
    }, async (request, reply) => {
        const { roomId } = request.params;
        const audio = await request.file();
        if (!audio) {
            throw new Error('Audio is required.');
        }
        const audioBuffer = await audio.toBuffer();
        const audioAsBase64 = audioBuffer.toString('base64');
        const transcription = await (0, gemini_1.transcribeAudio)(audioAsBase64, audio.mimetype);
        const embeddings = await (0, gemini_1.generateEmbeddings)(transcription);
        const result = await connection_1.db
            .insert(index_1.schema.audioChunks)
            .values({
            roomId,
            transcription,
            embeddings,
        })
            .returning();
        const chunk = result[0];
        if (!chunk) {
            throw new Error('Erro ao salvar chunk de áudio');
        }
        return reply.status(201).send({ chunkId: chunk.id, transcription });
    });
};
exports.uploadAudioRoute = uploadAudioRoute;
