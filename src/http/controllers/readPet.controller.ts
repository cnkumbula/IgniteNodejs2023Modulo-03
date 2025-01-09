import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeReadPetUseCase } from '@/use-cases/factories/make-readPet-useCase'

export async function readPet(request: FastifyRequest, reply: FastifyReply) {
  const searchPetQuerySchema = z.object({
    q: z.string(), //.toLowerCase(),
  })

  const { q } = searchPetQuerySchema.parse(request.query)

  const readPetUseCase = makeReadPetUseCase()

  const { pets } = await readPetUseCase.handle({
    query: q,
    // page,
  })

  return reply.status(200).send({
    pets, //: pets.pets,
  })
}
