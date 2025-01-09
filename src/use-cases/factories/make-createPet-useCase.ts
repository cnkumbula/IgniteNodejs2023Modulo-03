import { DrizzlePetRepository } from '@/repositories/Drizzle/drizzle-pet-repositories'
import { CreatePetUseCase } from '../pet/createPet.useCase'

export function makeCreatePetUseCase() {
  const drizzlePetRepository = new DrizzlePetRepository()
  const createPetUseCase = new CreatePetUseCase(drizzlePetRepository)

  return createPetUseCase
}
