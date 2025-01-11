import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './createPet.useCase'
import type { CreateOrgUseCase } from '../org/createOrg.useCase'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

let orgRepository: InMemoryOrgsRepository
let orgUseCase: CreateOrgUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository(orgRepository)
    sut = new CreatePetUseCase(petRepository)

    orgRepository = new InMemoryOrgsRepository()
  })
  it('should be able to create a pet', async () => {
    const createdOrg = await orgRepository.create({
      name: 'pets org',
      whatsapp: '+258801471458',
      address: 'Maputo-Provincia',
      email: 'PetsOrg585X@org.co.mz',
      password: 'any_password',
    })

    const createdOrgId = createdOrg[0].id

    const { pet } = await sut.handle({
      name: 'melted',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: createdOrgId,
      sex: 'female',
      size: '25 cm',
      color: 'white',
    })

    expect(pet[0].id).toEqual(expect.any(String))
  })
})
