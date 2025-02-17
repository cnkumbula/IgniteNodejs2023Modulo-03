import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeReadPetByStatusUseCase } from '@/use-cases/factories/make-readPetByStatus-useCase'

export async function readPetByStatus(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchPetQuerySchema = z.object({
    query: z.string().toLowerCase(),
    page: z.coerce.number().default(1),
  })

  const { page, query } = searchPetQuerySchema.parse(request.query)

  const readPetUseCase = makeReadPetByStatusUseCase()

  const { pets } = await readPetUseCase.handle({
    page,
    query,
  })
  return reply.status(200).send({
    pets,
  })
}
