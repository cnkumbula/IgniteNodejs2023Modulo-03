import { DrizzlePetRepository } from '@/repositories/Drizzle/drizzle-pet-repositories'
import { ReadPetByIdUseCase } from '../pet/readPetById.useCase'

export function makeReadPetByIdUseCase() {
  const petRepository = new DrizzlePetRepository()
  const readPetByIdUseCase = new ReadPetByIdUseCase(petRepository)

  return readPetByIdUseCase
}
