import type { PetsRepository } from '@/repositories/pets-repository'
import type { Pet } from '../../../types/drizzle'
import { resourceNotFoundErrors } from '../errors/resource-not-found-errors'

interface ReadPetUseCaseRequest {
  query: string
  //page: number
}

interface ReadPetUseCaseResponse {
  pets: Pet[]
}

export class ReadPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async handle({
    query,
    // page,
  }: ReadPetUseCaseRequest): Promise<ReadPetUseCaseResponse> {
    //const pets = await this.petsRepository.findByCity(query /*, page*/)
    const pets = await this.petsRepository.findByStatus(query /*, page*/)

    /* if (!org) {
      throw new InvalidOrgIdError()
    }*/

    /*if (!pets || pets.pets.length === 0) {
      throw new resourceNotFoundErrors()
    }

    return {
      pets: pets.pets,
    }*/

    if (!pets || pets.length === 0) {
      throw new resourceNotFoundErrors()
    }

    return {
      pets: pets,
    }
  }
}
