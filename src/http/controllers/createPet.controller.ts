import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-createPet-useCase'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const petbodySchema = z.object({
    name: z.string().toLowerCase(),
    age: z.string().toLowerCase(),
    sex: z.enum(['male', 'female']),
    size: z.string().toLowerCase(),
    color: z.string().toLowerCase(),
    description: z.string().toLowerCase(),
    status: z.enum(['available', 'adopted']).default('available'),
    orgId: z.string().cuid2(),
  })

  const { name, age, sex, size, color, description, status, orgId } =
    petbodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.handle({
      name,
      age,
      sex,
      size,
      color,
      description,
      status,
      orgId,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
