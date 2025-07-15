import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { db } from '../../db/connection.ts'
import { schema } from '../../db/schema/index.ts'
import { eq } from 'drizzle-orm'

export const getRoomChunksRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/rooms/:roomId/chunks',
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
      },
    },
    async (request, reply) => {
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
