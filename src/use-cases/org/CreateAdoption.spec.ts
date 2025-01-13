import { expect, describe, it, beforeEach } from 'vitest'
import bcrypt from 'bcryptjs'

import { CreateAdoptionUseCase } from './CreateAdoption.useCase'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { InMemoryAdoptionsRepository } from '@/repositories/in-memory/in-memory-adoption-repository'

let adoptionRepository: InMemoryAdoptionsRepository
let sut: CreateAdoptionUseCase

let orgRepository: InMemoryOrgsRepository
let userRepository: InMemoryUserRepository
let petRepository: InMemoryPetsRepository

describe('Create Adoption Use Case', () => {
  beforeEach(() => {
    adoptionRepository = new InMemoryAdoptionsRepository()
    sut = new CreateAdoptionUseCase(adoptionRepository)

    orgRepository = new InMemoryOrgsRepository()
    userRepository = new InMemoryUserRepository()
    petRepository = new InMemoryPetsRepository(orgRepository)
  })
  it('should be able to create meke an adoption', async () => {
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

    console.log(
      `createdOrg_1Id: ${createdOrg_1Id}, ${createdOrg_1[0].address}  
      \n createdOrg_2Id ${createdOrg_2Id}, ${createdOrg_2[0].address}  
      \n createdOrg_3Id ${createdOrg_3Id}, ${createdOrg_3[0].address}
      \n createdOrg_4Id ${createdOrg_4Id}, ${createdOrg_4[0].address}`
    )

    const createPet_1 = await petRepository.create({
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

    const createPet_2 = await petRepository.create({
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

    const createPet_3 = await petRepository.create({
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

    const createPet_4 = await petRepository.create({
      name: 'Mike',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: createdOrg_4Id,
      createdAt: new Date(),
      sex: 'male',
      size: '25 cm',
      color: 'White',
    })

    const createPet_5 = await petRepository.create({
      name: 'Brunoos',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: createdOrg_4Id,
      createdAt: new Date(),
      sex: 'male',
      size: '25 cm',
      color: 'light brown',
    })

    console.log(
      `createdPet_1Id: ${createPet_1[0].id}, ${createPet_1[0].name}  
      \n createdPet_2Id ${createPet_2[0].id}, ${createPet_2[0].name}  
      \n createdPet_3Id ${createPet_3[0].id}, ${createPet_3[0].name}
      \n createdPet_4Id ${createPet_4[0].id}, ${createPet_4[0].name}
      \n createdPet_5Id ${createPet_5[0].id}, ${createPet_5[0].name}`
    )

    const createdUser_1 = await userRepository.create({
      name: 'Ravi Malik',
      whatsapp: '+258841111110',
      email: 'RaviMalik@email.co.mz',
      password: bcrypt.hashSync('any_password', 10),
    })

    const createdUser_2 = await userRepository.create({
      name: 'Ayanna Hadassah',
      whatsapp: '+258842222220',
      email: 'AyannaHadassah@email.co.mz',
      password: bcrypt.hashSync('any_password', 10),
    })

    console.log(
      `createdPet_1Id: ${createdUser_1[0].id}, ${createdUser_1[0].name}  
      \n createdPet_5Id ${createdUser_2[0].id}, ${createdUser_2[0].name}`
    )

    const { adoption } = await sut.handle({
      userId: createdUser_1[0].id,
      petId: createPet_1[0].id,
      orgId: createdOrg_1Id,
      description: 'adoption description',
    })

    expect(adoption.id).toEqual(expect.any(String))
  })
})
