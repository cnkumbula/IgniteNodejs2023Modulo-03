import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeReadUserByEmailUseCase } from '@/use-cases/factories/make-readUserByEmail-useCase'

export async function readUser(request: FastifyRequest, reply: FastifyReply) {
  const searchUserQuerySchema = z.object({
    q: z.string().email().toLowerCase(),
  })

  const { q } = searchUserQuerySchema.parse(request.query)

  const searchUserUseCase = makeReadUserByEmailUseCase()

  const { user } = await searchUserUseCase.handle({
    userEmail: q,
  })

  return reply.status(200).send({
    user: {
      ...user,
      password: undefined,
    },
  })
}
