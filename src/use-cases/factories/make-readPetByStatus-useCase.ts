import { DrizzlePetRepository } from '@/repositories/Drizzle/drizzle-pet-repositories'
import { ReadPetByStatusUseCase } from '../pet/readPetByStatus.useCase'

export function makeReadPetByStatusUseCase() {
  const petRepository = new DrizzlePetRepository()
  const readPetByStatusUseCase = new ReadPetByStatusUseCase(petRepository)

  return readPetByStatusUseCase
}
