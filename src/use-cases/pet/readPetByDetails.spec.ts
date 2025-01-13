import { expect, describe, it, beforeEach } from 'vitest'

import bcrypt from 'bcryptjs'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { ReadPetByDetailsUseCase } from './readPetByDetails.useCase'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { ResourceNotFoundErrors } from '../errors/resource-not-found-errors'

let petRepository: InMemoryPetsRepository
let sut: ReadPetByDetailsUseCase

let orgRepository: InMemoryOrgsRepository

describe('Read pet information by given details Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    petRepository = new InMemoryPetsRepository(orgRepository)
    sut = new ReadPetByDetailsUseCase(petRepository)
  })
  it('should be able to read a pet by given details', async () => {
    const createdOrg_1 = await orgRepository.create({
      name: 'pets org MP1',
      whatsapp: '+258800000001',
      address: 'Maputo-Provincia',
      email: 'PetsOrgMP1@org.co.mz',
      password: bcrypt.hashSync('any_password', 10),
    })

    const createdOrg_2 = await orgRepository.create({
      name: 'pets org MP2',
      whatsapp: '+258800000002',
      address: 'Maputo-Provincia',
      email: 'PetsOrgMP2@org.co.mz',
      password: bcrypt.hashSync('any_password', 10),
    })

    const createdOrg_3 = await orgRepository.create({
      name: 'pets org MC1',
      whatsapp: '+258800000001',
      address: 'Maputo-Cidade',
      email: 'PetsOrgMC1@org.co.mz',
      password: bcrypt.hashSync('any_password', 10),
    })

    const createdOrg_4 = await orgRepository.create({
      name: 'pets org MC99',
      whatsapp: '+258800000099',
      address: 'Maputo-Cidade',
      email: 'PetsOrgMC99@org.co.mz',
      password: bcrypt.hashSync('any_password', 10),
    })

    const createdOrg_1Id = createdOrg_1[0].id
    const createdOrg_2Id = createdOrg_2[0].id
    const createdOrg_3Id = createdOrg_3[0].id
    const createdOrg_4Id = createdOrg_4[0].id

    /*console.log(
      `createdOrg_1Id: ${createdOrg_1Id}, ${createdOrg_1[0].address}  
      \n createdOrg_2Id ${createdOrg_2Id}, ${createdOrg_2[0].address}  
      \n createdOrg_3Id ${createdOrg_3Id}, ${createdOrg_3[0].address}
      \n createdOrg_4Id ${createdOrg_4Id}, ${createdOrg_4[0].address}`
    )*/

    await petRepository.create({
      name: 'melted',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: createdOrg_1Id,
      createdAt: new Date(),
      sex: 'female',
      size: '25 cm',
      color: 'white',
    })

    await petRepository.create({
      name: 'Rossi',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: createdOrg_2Id,
      createdAt: new Date(),
      sex: 'male',
      size: '25 cm',
      color: 'white',
    })

    await petRepository.create({
      name: 'Silky',
      age: '1 mes',
      description: 'chow-chow',
      status: 'adopted',
      orgId: createdOrg_3Id,
      createdAt: new Date(),
      sex: 'female',
      size: '25 cm',
      color: 'Brown',
    })

    await petRepository.create({
      name: 'Mirth',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: createdOrg_3Id,
      createdAt: new Date(),
      sex: 'male',
      size: '25 cm',
      color: 'Black',
    })

    await petRepository.create({
      name: 'Mike',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: createdOrg_4Id,
      createdAt: new Date(),
      sex: 'male',
      size: '25 cm',
      color: 'Brown',
    })

    await petRepository.create({
      name: 'Brunoos',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: createdOrg_4Id,
      createdAt: new Date(),
      sex: 'male',
      size: '25 cm',
      color: 'Brown',
    })

    await petRepository.create({
      name: 'Ilker',
      age: '1 mes',
      description: 'chow-chow',
      status: 'adopted',
      orgId: createdOrg_4Id,
      createdAt: new Date(),
      sex: 'male',
      size: '25 cm',
      color: 'Brown',
    })

    const { pets } = await sut.handle({
      description: 'chow-chow',
      sex: 'male',
      color: 'Brown',
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Mike',
        age: '1 mes',
        description: 'chow-chow',
        status: 'available',
      }),
      expect.objectContaining({
        name: 'Brunoos',
        age: '1 mes',
        description: 'chow-chow',
        status: 'available',
      }),
    ])
  })

  it.skip('should return an empty list if no pets match the criteria', async () => {
    const createdOrg_31 = await orgRepository.create({
      name: 'pets org MC1',
      whatsapp: '+258800000001',
      address: 'Maputo-Cidade',
      email: 'PetsOrgMC1@org.co.mz',
      password: bcrypt.hashSync('any_password', 10),
    })

    const createdOrg_31Id = createdOrg_31[0].id

    await petRepository.create({
      name: 'melted',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: createdOrg_31Id,
      createdAt: new Date(),
      sex: 'female',
      size: '25 cm',
      color: 'white',
    })

    await expect(() => {
      return sut.handle({
        description: 'ewddsdsd',
        sex: 'male',
        color: 'Blue',
        page: 1,
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundErrors)
  })
})
