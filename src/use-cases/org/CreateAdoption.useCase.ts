import type { AdoptionRequestRepository } from '@/repositories/adoptionRequest-repository'
import type { AdoptionRequest } from '../../../types/drizzle'

interface CreateAdoption {
  userId: string
  petId: string
  orgId: string
  description: string
}

interface CreateAdoptionUseCaseResponse {
  adoption: AdoptionRequest
}

export class CreateAdoptionUseCase {
  constructor(private adoptionRequestRepository: AdoptionRequestRepository) {}
  async handle({
    userId,
    petId,
    orgId,
    description,
  }: CreateAdoption): Promise<CreateAdoptionUseCaseResponse> {
    const adoption = await this.adoptionRequestRepository.create({
      petId,
      orgId,
      userId,
      description,
    })

    return { adoption }
  }
}
