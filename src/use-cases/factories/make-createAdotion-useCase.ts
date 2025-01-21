import { DrizzleAdoptionsRepository } from '@/repositories/Drizzle/drizzle-adoption-repositories'
import { CreateAdoptionUseCase } from '../org/CreateAdoption.useCase'

export function makeCreateAdoptionUseCase() {
  const adoptionRequestRepository = new DrizzleAdoptionsRepository()
  const createAdoptionUseCase = new CreateAdoptionUseCase(
    adoptionRequestRepository
  )

  return createAdoptionUseCase
}
