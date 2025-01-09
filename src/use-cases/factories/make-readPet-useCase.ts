import { DrizzlePetRepository } from '@/repositories/Drizzle/drizzle-pet-repositories'
import { ReadPetByStatusUseCase } from '../pet/readPetByStatus.useCase'

export function makeReadPetUseCase() {
  const drizzlePetRepository = new DrizzlePetRepository()
  const readPetUseCase = new ReadPetByStatusUseCase(drizzlePetRepository)

  return readPetUseCase
}
