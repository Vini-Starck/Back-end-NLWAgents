import { GoogleGenAI } from '@google/genai'
import { env } from '../env.ts'

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
})

const model = 'gemini-2.5-flash'

/**
 * Gera uma resposta diretamente com base na pergunta do usuário,
 * sem depender de transcrições ou contexto prévio.
 */
export async function generateAnswer(question: string) {
  const prompt = `
    Você é um assistente inteligente que responde perguntas de forma clara e precisa em português do Brasil.

    PERGUNTA:
    ${question}

    INSTRUÇÕES:
    - Se não souber a resposta, diga: "Desculpe, não tenho conhecimento suficiente para responder a essa pergunta."
    - Seja objetivo, educado e profissional;
    - Não invente informações;
    - Mantenha o tom informativo.
  `.trim()

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
  })

  if (!response.text) {
    throw new Error('Falha ao gerar resposta pelo Gemini')
  }

  return response.text
}
