import type { PetsRepository } from '../pets-repository'
import type { PetInsert, Pet } from '../../../types/drizzle'
import { createId } from '@paralleldrive/cuid2'

export class InMemoryPetsRepository implements PetsRepository {
  async findById(id: string) {
    //  throw new Error('Method not implemented.')
    return []
  }

  async findByCity(query: string) {
    const pets: Pet[] = []
    const orgs: Org[] = []
    // Add logic to populate pets and orgs arrays
    return { pets, orgs }
  }

  async findByStatus(status: string) {
    return []
  }

  async findByPetDetails(details: string) {
    return []
  }

  async create(data: PetInsert) {
    return []
  }
}
