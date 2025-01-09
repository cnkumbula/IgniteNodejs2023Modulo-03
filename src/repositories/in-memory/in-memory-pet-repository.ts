import type { PetsRepository } from '../pets-repository'
import type { PetInsert, Pet } from '../../../types/drizzle'
import { createId } from '@paralleldrive/cuid2'

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = []
  async findById(id: string) {
    const pet = this.pets.find(pet => pet.id === id)

    if (!pet) {
      return []
    }

    return [pet]
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
    const pet = [
      {
        id: createId(),
        name: data.name,
        age: data.age,
        description: data.description,
        status: data.status,
        orgId: data.orgId,
        sex: data.sex,
        size: data.size,
        color: data.color,
        createdAt: new Date(),
      },
    ]

    this.pets.push(pet[0])

    return pet
  }
}
