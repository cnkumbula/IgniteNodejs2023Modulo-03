import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CreatePetUseCase } from '@/use-cases/createPet.useCase'
import { DrizzlePetRepository } from '@/repositories/Drizzle/drizzle-pet-repositories'

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
    const drizzlePetRepository = new DrizzlePetRepository()
    const createPetUseCase = new CreatePetUseCase(drizzlePetRepository)

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
