"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const audio_chunks_1 = require("./audio-chunks");
const questions_1 = require("./questions");
const rooms_1 = require("./rooms");
exports.schema = {
    rooms: rooms_1.rooms,
    questions: questions_1.questions,
    audioChunks: audio_chunks_1.audioChunks,
};
