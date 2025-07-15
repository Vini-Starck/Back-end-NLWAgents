import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env.ts'
// import { createQuestionRoute } from './http/routes/create-question.ts'
import { createRoomRoute } from './http/routes/create-room.ts'
import { getRoomQuestions } from './http/routes/get-room-questions.ts'
import { getRoomsRoute } from './http/routes/get-rooms.ts'
import { uploadAudioRoute } from './http/routes/upload-audio.ts'
import { createQuestionRoute2 } from './http/routes/create-question2.ts'
import { getRoomChunksRoute } from './http/routes/get-room-chunks.ts'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: (origin, cb) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://seu-app.web.app', // ou outro domínio do Firebase Hosting
    ]

    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true)
    } else {
      cb(new Error("Not allowed"), false)
    }
  }
})


app.register(fastifyMultipart)

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return 'OK'
})

app.register(getRoomsRoute)
app.register(createRoomRoute)
app.register(getRoomQuestions)
// app.register(createQuestionRoute)
app.register(uploadAudioRoute)
app.register(createQuestionRoute2)
app.register(getRoomChunksRoute)

app.listen({ port: Number(process.env.PORT) || 3333 })
