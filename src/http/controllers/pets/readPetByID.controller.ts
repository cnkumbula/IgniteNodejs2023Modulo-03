import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeReadPetByIdUseCase } from '@/use-cases/factories/make-readPetById-useCase'
import { ResourceNotFoundErrors } from '@/use-cases/errors/resource-not-found-errors'

export async function readPetById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchPetParamsSchema = z.object({
    petId: z.string().cuid2(),
  })

  const { petId } = searchPetParamsSchema.parse(request.params)

  try {
    const readPetUseCase = makeReadPetByIdUseCase()

    const { pet } = await readPetUseCase.handle({
      petId,
    })
    return reply.status(200).send({
      pet,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundErrors) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
