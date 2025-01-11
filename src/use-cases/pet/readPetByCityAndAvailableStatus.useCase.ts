import type { PetsRepository } from '@/repositories/pets-repository'
import type { Pet } from '../../../types/drizzle'
import { ResourceNotFoundErrors } from '../errors/resource-not-found-errors'

interface ReadPetByCitynAvailableStatusUseCaseRequest {
  city: string
  page: number
}

interface ReadPetByCitynAvailableStatusUseCaseResponse {
  pets: Pet[]
}

export class ReadPetByCitynAvailableStatusUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async handle({
    city,
    page,
  }: ReadPetByCitynAvailableStatusUseCaseRequest): Promise<ReadPetByCitynAvailableStatusUseCaseResponse> {
    const pets = await this.petsRepository.findByCityAndAvailableStatus(
      city,
      page
    )

    if (!pets || pets.length === 0) {
      throw new ResourceNotFoundErrors()
    }

    return {
      pets,
    }
  }
}
