import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { createOrgUseCase } from '@/use-cases/createOrg.useCase'

export async function createOrg(request: FastifyRequest, reply: FastifyReply) {
  const whatsappRegex = /^\+258\d{9}$/

  const orgbodySchema = z.object({
    name: z.string(),
    whatsapp: z.string().regex(whatsappRegex, 'Invalid Wahatsapp Number!'),
    address: z.string(),
    email: z.string().email().toLowerCase(),
    password: z.string(),
  })

  const { name, whatsapp, address, email, password } = orgbodySchema.parse(
    request.body,
  )

  try {
    await createOrgUseCase({
      name,
      whatsapp,
      address,
      email,
      password,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
