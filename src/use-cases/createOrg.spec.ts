import { expect, describe, it, beforeEach } from 'vitest'
import { CreateOrgUseCase } from './createOrg.useCase'
import bcrypt from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists'

let orgRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgRepository)
  })
  it('should be able to create an org', async () => {
    const { org } = await sut.handle({
      name: 'pets org',
      whatsapp: '+258801471458',
      address: 'Maputo-Provincia',
      email: 'PetsOrg585X@org.co.mz',
      password: 'any_password',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create an org with same email or whatsapp', async () => {
    const email = 'PetsOrg585X@org.co.mz'
    const whatsapp = '+258801471458'

    await sut.handle({
      name: 'pets org',
      whatsapp,
      address: 'Maputo-Provincia',
      email,
      password: 'any_password',
    })

    await expect(() => {
      return sut.handle({
        name: 'pets org',
        whatsapp,
        address: 'Maputo-Provincia',
        email,
        password: 'any_password',
      })
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should hash org password', async () => {
    const { org } = await sut.handle({
      name: 'pets org',
      whatsapp: '+258801471458',
      address: 'Maputo-Provincia',
      email: 'PetsOrg585X@org.co.mz',
      password: 'any_password',
    })

    const isPasswordCorrectlyHashed = await bcrypt.compare(
      'any_password',
      org.password
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
