import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateAdoptionUseCase } from '@/use-cases/factories/make-createAdotion-useCase'

export async function createAdoption(
  request: FastifyRequest,
  reply: FastifyReply
) {
  /* const createAdoptionParamsSchema = z.object({
    orgId: z.string().cuid2(),
  })*/

  const adoptionBodySchema = z.object({
    orgId: z.string().cuid2(),
    userId: z.string().cuid2(),
    petId: z.string().cuid2(),
    description: z.string().toLowerCase(),
  })

  //const { orgId } = createAdoptionParamsSchema.parse(request.params)
  const { orgId, userId, petId, description } = adoptionBodySchema.parse(
    request.body
  )

  const createAdoptionUseCase = makeCreateAdoptionUseCase()

  await createAdoptionUseCase.handle({
    orgId,
    petId,
    userId,
    description,
  })

  return reply.status(201).send()
}
