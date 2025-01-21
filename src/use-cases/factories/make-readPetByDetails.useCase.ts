import { DrizzlePetRepository } from '@/repositories/Drizzle/drizzle-pet-repositories'
import { ReadPetByDetailsUseCase } from '../pet/readPetByDetails.useCase'

export function makeReadPetByDetailsUseCase() {
  const petRepository = new DrizzlePetRepository()
  const readPetByDetailsUseCase = new ReadPetByDetailsUseCase(petRepository)

  return readPetByDetailsUseCase
}
