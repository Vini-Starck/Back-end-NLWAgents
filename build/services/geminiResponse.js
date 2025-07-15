"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAnswer = generateAnswer;
const genai_1 = require("@google/genai");
const env_1 = require("../env");
const gemini = new genai_1.GoogleGenAI({
    apiKey: env_1.env.GEMINI_API_KEY,
});
const model = 'gemini-2.5-flash';
/**
 * Gera uma resposta diretamente com base na pergunta do usuário,
 * sem depender de transcrições ou contexto prévio.
 */
async function generateAnswer(question) {
    const prompt = `
    Você é um assistente inteligente que responde perguntas de forma clara e precisa em português do Brasil.

    PERGUNTA:
    ${question}

    INSTRUÇÕES:
    - Se não souber a resposta, diga: "Desculpe, não tenho conhecimento suficiente para responder a essa pergunta."
    - Seja objetivo, educado e profissional;
    - Não invente informações;
    - Mantenha o tom informativo.
  `.trim();
    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                role: 'user',
                parts: [{ text: prompt }],
            },
        ],
    });
    if (!response.text) {
        throw new Error('Falha ao gerar resposta pelo Gemini');
    }
    return response.text;
}
