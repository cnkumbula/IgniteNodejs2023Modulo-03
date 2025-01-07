import type { OrgsRepository } from '@/repositories/orgs-repository'
import type { Org } from '../../types/drizzle'
import { resourceNotFoundErrors } from './errors/resource-not-found-errors'

interface ReadOrgProfileUseCaseRequest {
  orgId: string
}

interface ReadOrgProfileUseCaseResponse {
  org: Org
}

export class ReadOrgProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async handle({
    orgId,
  }: ReadOrgProfileUseCaseRequest): Promise<ReadOrgProfileUseCaseResponse> {
    const org = await this.orgsRepository.findbyId(orgId)

    /* if (!org) {
      throw new InvalidOrgIdError()
    }*/

    if (!org || org.length === 0) {
      throw new resourceNotFoundErrors()
    }

    return {
      org: org[0],
    }
  }
}
