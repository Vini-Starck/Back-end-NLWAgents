import { z } from 'zod'
import { db } from '../../db/connection'
import { schema } from '../../db/schema/index'
import { eq } from 'drizzle-orm'
import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'

// Defina o esquema dos parâmetros da rota
const paramsSchema = z.object({
  roomId: z.string(),
})

// Tipagem explícita para `request.params`
type Params = z.infer<typeof paramsSchema>

// Agora tipamos explicitamente a função de rota
export const getRoomChunksRoute: FastifyPluginCallbackZod = (app) => {
  app.get<{ Params: Params }>(  // Aqui estamos tipando os parâmetros da rota
    '/rooms/:roomId/chunks',
    {
      schema: {
        params: paramsSchema,  // Defina o esquema de parâmetros
      },
    },
    async (request, reply) => {
      // Agora, o `request.params` já será do tipo `{ roomId: string }`
      const { roomId } = request.params

      const chunks = await db
        .select({
          id: schema.audioChunks.id,
          transcription: schema.audioChunks.transcription,
          createdAt: schema.audioChunks.createdAt,
        })
        .from(schema.audioChunks)
        .where(eq(schema.audioChunks.roomId, roomId))
        .orderBy(schema.audioChunks.createdAt)

      return reply.send({ chunks })
    }
  )
}
