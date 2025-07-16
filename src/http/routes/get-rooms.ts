import { count, eq } from 'drizzle-orm'
import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { db } from '../../db/connection'
import { schema } from '../../db/schema/index'

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms', async () => {
    const rooms = await db
      .select({
        id: schema.rooms.id,
        name: schema.rooms.name,
        createdAt: schema.rooms.createdAt,
      })
      .from(schema.rooms)
      .orderBy(schema.rooms.createdAt)

    // Agora faz um count separado para cada sala
    const roomsWithCount = await Promise.all(
      rooms.map(async (room) => {
        const [{ count: questionsCount }] = await db
          .select({ count: count() })
          .from(schema.questions)
          .where(eq(schema.questions.roomId, room.id))

        return {
          ...room,
          questionsCount: Number(questionsCount),
        }
      })
    )

    return roomsWithCount
  })
}
