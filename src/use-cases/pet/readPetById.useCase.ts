import type { PetsRepository } from '@/repositories/pets-repository'
import type { Pet } from '../../../types/drizzle'
import { ResourceNotFoundErrors } from '../errors/resource-not-found-errors'

interface ReadPetUseCaseRequest {
  petId: string
}

interface ReadPetUseCaseResponse {
  pet: Pet
}

export class ReadPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async handle({
    petId,
  }: ReadPetUseCaseRequest): Promise<ReadPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet || pet.length === 0) {
      throw new ResourceNotFoundErrors()
    }

    return {
      pet: pet[0],
    }
  }
}
