import { expect, describe, it, beforeEach } from 'vitest'
import bcrypt from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { ReadOrgProfileUseCase } from './readOrgProfile.useCase'
import { ResourceNotFoundErrors } from '../errors/resource-not-found-errors'

let orgRepository: InMemoryOrgsRepository
let sut: ReadOrgProfileUseCase

describe('Get Org Profile Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new ReadOrgProfileUseCase(orgRepository)
  })
  it('should be able to get an org profile', async () => {
    const createdOrg = await orgRepository.create({
      name: 'pets org',
      whatsapp: '+258801471458',
      address: 'Maputo-Provincia',
      email: 'PetsOrg585X@org.co.mz',
      password: await bcrypt.hashSync('any_password', 10),
    })

    const { org } = await sut.handle({
      orgId: createdOrg[0].id,
    })

    expect(org.name).toEqual('pets org')
  })

  it('should not be able to get an org profile with wrong id', async () => {
    await expect(() =>
      sut.handle({
        orgId: 'PetsOrg585X@org.co.mz',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundErrors)
  })
})
