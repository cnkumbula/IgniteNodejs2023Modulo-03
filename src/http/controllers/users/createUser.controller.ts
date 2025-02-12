import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateUserUseCase } from '@/use-cases/factories/make-createUser-useCase'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const whatsappRegex = /^\+258\d{9}$/

  const orgbodySchema = z.object({
    name: z.string().toLowerCase(),
    email: z.string().email().toLowerCase(),
    password: z.string(),
    whatsapp: z.string().regex(whatsappRegex, 'Invalid Wahatsapp Number!'),
  })

  const { name, email, password, whatsapp } = orgbodySchema.parse(request.body)

  try {
    const createOrgUseCase = makeCreateUserUseCase()

    await createOrgUseCase.handle({
      name,
      email,
      password,
      whatsapp,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
