"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoomRoute = void 0;
const v4_1 = require("zod/v4");
const connection_1 = require("../../db/connection");
const index_1 = require("../../db/schema/index");
const createRoomRoute = (app) => {
    app.post('/rooms', {
        schema: {
            body: v4_1.z.object({
                name: v4_1.z.string().min(1),
                description: v4_1.z.string().optional(),
            }),
        },
    }, async (request, reply) => {
        const { name, description } = request.body;
        const result = await connection_1.db
            .insert(index_1.schema.rooms)
            .values({
            name,
            description,
        })
            .returning();
        const insertedRoom = result[0];
        if (!insertedRoom) {
            throw new Error('Failed to create new room.');
        }
        return reply.status(201).send({ roomId: insertedRoom.id });
    });
};
exports.createRoomRoute = createRoomRoute;
