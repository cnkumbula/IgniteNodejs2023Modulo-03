import { makeReadOrgProfileUseCase } from '@/use-cases/factories/make-readOrgProfile-useCase'
import type { FastifyRequest, FastifyReply } from 'fastify'

export async function readOrgProfile(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getOrgProfile = makeReadOrgProfileUseCase()

  const { org } = await getOrgProfile.handle({
    orgId: request.user.sub,
  })
  return reply.status(200).send({
    org: {
      ...org,
      password: undefined,
    },
  })
}
