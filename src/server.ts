import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env'
// import { createQuestionRoute } from './http/routes/create-question.ts'
import { createRoomRoute } from './http/routes/create-room'
import { getRoomQuestions } from './http/routes/get-room-questions'
import { getRoomsRoute } from './http/routes/get-rooms'
import { uploadAudioRoute } from './http/routes/upload-audio'
import { createQuestionRoute2 } from './http/routes/create-question2'
import { getRoomChunksRoute } from './http/routes/get-room-chunks'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: (origin, cb) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://nlw-agents-ai.web.app',
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

const port = Number(process.env.PORT) || 3333

app.listen({ port, host: '0.0.0.0' }, () => {
  console.log(`🚀 HTTP server running on port ${port}`)
})
