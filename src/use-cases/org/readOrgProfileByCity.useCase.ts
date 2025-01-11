import type { OrgsRepository } from '@/repositories/orgs-repository'
import type { Org } from '../../../types/drizzle'

interface ReadOrgProfileBycityUseCaseRequest {
  adress: string
  page: number
}

interface ReadOrgProfileBycityUseCaseResponse {
  orgs: Org[]
}

export class ReadOrgProfileBycityUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async handle({
    adress,
    page,
  }: ReadOrgProfileBycityUseCaseRequest): Promise<ReadOrgProfileBycityUseCaseResponse> {
    const orgs = await this.orgsRepository.findByCity(adress, page)

    return {
      orgs,
    }
  }
}
