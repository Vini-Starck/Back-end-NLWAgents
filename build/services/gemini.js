"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transcribeAudio = transcribeAudio;
exports.generateEmbeddings = generateEmbeddings;
exports.generateAnswer = generateAnswer;
const genai_1 = require("@google/genai");
const env_1 = require("../env");
const gemini = new genai_1.GoogleGenAI({
    apiKey: env_1.env.GEMINI_API_KEY,
});
const model = 'gemini-2.5-flash';
async function transcribeAudio(audioAsBase64, mimeType) {
    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: 'Transcreva o áudio para português do Brasil. Seja preciso e natural na transcrição. Mantenha a pontuação adequada e divida o texto em parágrafos quando for apropriado.',
            },
            {
                inlineData: {
                    mimeType,
                    data: audioAsBase64,
                },
            },
        ],
    });
    if (!response.text) {
        throw new Error('Não foi possível converter o áudio');
    }
    return response.text;
}
async function generateEmbeddings(text) {
    const response = await gemini.models.embedContent({
        model: 'text-embedding-004',
        contents: [{ text }],
        config: {
            taskType: 'RETRIEVAL_DOCUMENT',
        },
    });
    if (!response.embeddings?.[0].values) {
        throw new Error('Não foi possível gerar os embeddings.');
    }
    return response.embeddings[0].values;
}
async function generateAnswer(question, transcriptions) {
    const context = transcriptions.join('\n\n');
    const prompt = `
    Com base no texto fornecido abaixo como contexto, responda a pergunta de forma clara e precisa em português do Brasil.
  
    CONTEXTO:
    ${context}

    PERGUNTA:
    ${question}

    INSTRUÇÕES:
    - Use apenas informações contidas no contexto enviado;
    - Se a resposta não for encontrada no contexto, apenas responda que não possui informações suficientes para responder;
    - Seja objetivo;
    - Mantenha um tom educativo e profissional;
    - Cite trechos relevantes do contexto se apropriado;
    - Se for citar o contexto, utilize o temo "conteúdo da aula";
  `.trim();
    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: prompt,
            },
        ],
    });
    if (!response.text) {
        throw new Error('Falha ao gerar resposta pelo Gemini');
    }
    return response.text;
}
