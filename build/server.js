"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = require("@fastify/cors");
const multipart_1 = require("@fastify/multipart");
const fastify_1 = require("fastify");
const fastify_type_provider_zod_1 = require("fastify-type-provider-zod");
// import { createQuestionRoute } from './http/routes/create-question.ts'
const create_room_1 = require("./http/routes/create-room");
const get_room_questions_1 = require("./http/routes/get-room-questions");
const get_rooms_1 = require("./http/routes/get-rooms");
const upload_audio_1 = require("./http/routes/upload-audio");
const create_question2_1 = require("./http/routes/create-question2");
const get_room_chunks_1 = require("./http/routes/get-room-chunks");
const app = (0, fastify_1.fastify)().withTypeProvider();
app.register(cors_1.fastifyCors, {
    origin: (origin, cb) => {
        const allowedOrigins = [
            'http://localhost:5173',
            'https://seu-app.web.app', // ou outro domínio do Firebase Hosting
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            cb(null, true);
        }
        else {
            cb(new Error("Not allowed"), false);
        }
    }
});
app.register(multipart_1.fastifyMultipart);
app.setSerializerCompiler(fastify_type_provider_zod_1.serializerCompiler);
app.setValidatorCompiler(fastify_type_provider_zod_1.validatorCompiler);
app.get('/health', () => {
    return 'OK';
});
app.register(get_rooms_1.getRoomsRoute);
app.register(create_room_1.createRoomRoute);
app.register(get_room_questions_1.getRoomQuestions);
// app.register(createQuestionRoute)
app.register(upload_audio_1.uploadAudioRoute);
app.register(create_question2_1.createQuestionRoute2);
app.register(get_room_chunks_1.getRoomChunksRoute);
app.listen({ port: Number(process.env.PORT) || 3333 });
