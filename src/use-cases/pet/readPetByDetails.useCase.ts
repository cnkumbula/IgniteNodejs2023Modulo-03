import type { PetsRepository } from '@/repositories/pets-repository'
import type { Pet } from '../../../types/drizzle'
import { ResourceNotFoundErrors } from '../errors/resource-not-found-errors'

interface ReadPetByDetailsUseCaseRequest {
  sex: string
  description: string
  color: string
  page: number
}

interface ReadPetByDetailsCaseResponse {
  pets: Pet[]
}

export class ReadPetByDetailsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async handle({
    description,
    sex,
    color,
    page,
  }: ReadPetByDetailsUseCaseRequest): Promise<ReadPetByDetailsCaseResponse> {
    const petMacthed = await this.petsRepository.findByPetDetails(
      description,
      sex,
      color,
      page
    )

    if (!petMacthed || petMacthed.length === 0) {
      throw new ResourceNotFoundErrors()
    }

    return {
      pets: petMacthed,
    }
  }
}
