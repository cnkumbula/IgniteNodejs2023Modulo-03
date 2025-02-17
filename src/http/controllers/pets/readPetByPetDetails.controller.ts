import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeReadPetByDetailsUseCase } from '@/use-cases/factories/make-readPetByDetails.useCase'
import { ResourceNotFoundErrors } from '@/use-cases/errors/resource-not-found-errors'

export async function readPetByDetails(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchPetQuerySchema = z.object({
    description: z.string().toLowerCase(),
    sex: z.string().toLowerCase(),
    color: z.string().toLowerCase(),
    page: z.coerce.number().default(1),
  })

  try {
    const { description, sex, color, page } = searchPetQuerySchema.parse(
      request.query
    )

    const readPetUseCase = makeReadPetByDetailsUseCase()

    const { pets } = await readPetUseCase.handle({
      description,
      sex,
      color,
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
