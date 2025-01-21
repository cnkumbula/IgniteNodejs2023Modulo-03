import { DrizzlePetRepository } from '@/repositories/Drizzle/drizzle-pet-repositories'
import { ReadPetByCitynAvailableStatusUseCase } from '../pet/readPetByCityAndAvailableStatus.useCase'

export function makeReadPetByCitynAvailableStatusUseCase() {
  const petRepository = new DrizzlePetRepository()
  const readPetByCityAndAvailableStatusUseCase =
    new ReadPetByCitynAvailableStatusUseCase(petRepository)

  return readPetByCityAndAvailableStatusUseCase
}
