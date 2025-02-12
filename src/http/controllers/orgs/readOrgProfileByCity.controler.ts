import { makeReadOrgProfileByCityUseCase } from '@/use-cases/factories/make-readOrgProfileByCity-useCase'
import type { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function readOrgProfileByCity(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const searchOrgsQuerySchema = z.object({
    q: z.string().toLowerCase(),
    page: z.coerce.number().default(1),
  })

  const { q, page } = searchOrgsQuerySchema.parse(request.query)

  const getOrgProfileByCity = makeReadOrgProfileByCityUseCase()

  const { orgs } = await getOrgProfileByCity.handle({
    adress: q,
    page: page,
  })
  return reply.status(200).send({
    orgs,
  })
}
