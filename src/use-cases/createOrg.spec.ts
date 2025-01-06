import { expect, describe, it } from 'vitest'
import { CreateOrgUseCase } from './createOrg.useCase'
import bcrypt from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists'

describe('Create Org Use Case', () => {
  it('should be able to create an org', async () => {
    const orgRepository = new InMemoryOrgsRepository()
    const createOrgUseCase = new CreateOrgUseCase(orgRepository)

    const { org } = await createOrgUseCase.handle({
      name: 'pets org',
      whatsapp: '+258801471458',
      address: 'Maputo-Provincia',
      email: 'PetsOrg585X@org.co.mz',
      password: 'any_password',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to create an org with same email or whatsapp', async () => {
    const orgRepository = new InMemoryOrgsRepository()
    const createOrgUseCase = new CreateOrgUseCase(orgRepository)

    const email = 'PetsOrg585X@org.co.mz'
    const whatsapp = '+258801471458'

    await createOrgUseCase.handle({
      name: 'pets org',
      whatsapp,
      address: 'Maputo-Provincia',
      email,
      password: 'any_password',
    })

    await expect(() => {
      return createOrgUseCase.handle({
        name: 'pets org',
        whatsapp,
        address: 'Maputo-Provincia',
        email,
        password: 'any_password',
      })
    }).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should hash org password', async () => {
    const orgRepository = new InMemoryOrgsRepository()
    const createOrgUseCase = new CreateOrgUseCase(orgRepository)

    const { org } = await createOrgUseCase.handle({
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
