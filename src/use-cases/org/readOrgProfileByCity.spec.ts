import { expect, describe, it, beforeEach } from 'vitest'
import bcrypt from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { ReadOrgProfileBycityUseCase } from './readOrgProfileByCity.useCase'

let orgRepository: InMemoryOrgsRepository
let sut: ReadOrgProfileBycityUseCase

describe('Get Org Profile by City Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new ReadOrgProfileBycityUseCase(orgRepository)
  })
  it('should be able to get an org profile by city', async () => {
    await orgRepository.create({
      name: 'pets org MP1',
      whatsapp: '+258800000001',
      address: 'Maputo-Provincia',
      email: 'PetsOrgMP1@org.co.mz',
      password: await bcrypt.hashSync('any_password', 10),
    })

    await orgRepository.create({
      name: 'pets org MP2',
      whatsapp: '+258800000002',
      address: 'Maputo-Provincia',
      email: 'PetsOrgMP2@org.co.mz',
      password: await bcrypt.hashSync('any_password', 10),
    })

    await orgRepository.create({
      name: 'pets org MC1',
      whatsapp: '+258800000001',
      address: 'Maputo-Cidade',
      email: 'PetsOrgMC1@org.co.mz',
      password: await bcrypt.hashSync('any_password', 10),
    })

    const { orgs } = await sut.handle({
      adress: 'Maputo-Provincia',
      page: 1,
    })

    expect(orgs).toHaveLength(2)
    expect(orgs).toEqual([
      expect.objectContaining({ name: 'pets org MP1' }),
      expect.objectContaining({ name: 'pets org MP2' }),
    ])
  })
})
