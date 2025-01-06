import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CreateOrgUseCase } from '@/use-cases/createOrg.useCase'
import { DrizzleOrgRepository } from '@/repositories/Drizzle/drizzle-org-repositories'

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const whatsappRegex = /^\+258\d{9}$/

  const orgbodySchema = z.object({
    name: z.string().toLowerCase(),
    whatsapp: z.string().regex(whatsappRegex, 'Invalid Wahatsapp Number!'),
    address: z.string().toLowerCase(),
    email: z.string().email().toLowerCase(),
    password: z.string(),
  })

  const { name, whatsapp, address, email, password } = orgbodySchema.parse(
    request.body
  )

  try {
    const drizzleOrgRepository = new DrizzleOrgRepository()
    const createOrgUseCase = new CreateOrgUseCase(drizzleOrgRepository)

    await createOrgUseCase.handle({
      name,
      whatsapp,
      address,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof Error) {
      return reply.status(409).send({ message: error.message })
    }
    //return reply.status(500).send()

    throw error
  }

  return reply.status(201).send()
}
