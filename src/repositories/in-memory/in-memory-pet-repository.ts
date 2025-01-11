import type { PetsRepository } from '../pets-repository'
//import type { OrgsRepository } from '../orgs-repository'
import type { PetInsert, Pet, Org } from '../../../types/drizzle'
import { createId } from '@paralleldrive/cuid2'
import type { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  private orgsRepo: InMemoryOrgsRepository

  constructor(orgRepo: InMemoryOrgsRepository) {
    this.orgsRepo = orgRepo // Initialize it in the constructor
  }

  async findById(id: string) {
    const pet = this.pets.find(pet => pet.id === id)

    if (!pet) {
      return []
    }

    return [pet]
  }

  async findByCityAndAvailableStatus(city: string, page: number) {
    //console.log('Filtering organizations by city...')

    const filteredCities = this.orgsRepo.orgs.filter(
      org => org.address === city
    )

    //console.log('Filtered Organizations:', filteredCities)

    if (!filteredCities) {
      return []
    }

    //console.log('Filtering pets by available status...')
    const availablePets = this.pets.filter(pet => pet.status === 'available')
    //console.log('Available Pets:', availablePets)

    //console.log('Mapping pets to organizations...')
    const orgWithPets = filteredCities.map(org => {
      const petsInOrg = availablePets.filter(pet => pet.orgId === org.id)
      //console.log(`Pets for Org ${org.name}:`, petsInOrg)
      return { ...org, pets: petsInOrg }
    })

    //console.log('Flattening pets from organizations and paginating...')
    const paginatedPets = orgWithPets
      .flatMap(org => org.pets)
      .slice((page - 1) * 10, page * 10)

    //console.log('Paginated Pets:', paginatedPets)
    return paginatedPets
  }

  async findByStatus(status: string, page: number) {
    return this.pets
      .filter(pet => pet.status === status)
      .slice((page - 1) * 10, page * 10)
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
