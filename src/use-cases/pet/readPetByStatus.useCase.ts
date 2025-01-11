import type { PetsRepository } from '@/repositories/pets-repository'
import type { Pet } from '../../../types/drizzle'

interface ReadPetUseCaseRequest {
  query: string
  page: number
}

interface ReadPetUseCaseResponse {
  pets: Pet[]
}

export class ReadPetByStatusUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async handle({
    query,
    page,
  }: ReadPetUseCaseRequest): Promise<ReadPetUseCaseResponse> {
    const pets = await this.petsRepository.findByStatus(query, page)

    return {
      pets,
    }
  }
}
