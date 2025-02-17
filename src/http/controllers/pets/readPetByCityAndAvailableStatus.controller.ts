import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeReadPetByCitynAvailableStatusUseCase } from '@/use-cases/factories/make-readPetByCityAndAvailableStatus-useCase'
import { ResourceNotFoundErrors } from '@/use-cases/errors/resource-not-found-errors'

export async function readPetByCityAndAvailableStatus(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchPetQuerySchema = z.object({
    city: z.string().toLowerCase(),
    page: z.coerce.number().default(1),
  })

  try {
    const { city, page } = searchPetQuerySchema.parse(request.query)

    const readPetUseCase = makeReadPetByCitynAvailableStatusUseCase()

    const { pets } = await readPetUseCase.handle({
      city,
      page,
    })
    return reply.status(200).send({
      pets,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundErrors) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
