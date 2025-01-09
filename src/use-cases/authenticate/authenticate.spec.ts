import { expect, describe, it, beforeEach } from 'vitest'
import bcrypt from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from '../authenticate/authenticate.useCase'
import { InvalidCredentialsError } from '../errors/invalid-credential-errors'

let orgRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgRepository)
  })
  it('should be able to authenticate an org', async () => {
    await orgRepository.create({
      name: 'pets org',
      whatsapp: '+258801471458',
      address: 'Maputo-Provincia',
      email: 'PetsOrg585X@org.co.mz',
      password: await bcrypt.hashSync('any_password', 10),
    })

    const { org } = await sut.handle({
      email: 'PetsOrg585X@org.co.mz',
      password: 'any_password',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate an org with wrong credentials', async () => {
    expect(() =>
      sut.handle({
        email: 'PetsOrg585X@org.co.mz',
        password: 'any_password',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate an org with wrong password', async () => {
    await orgRepository.create({
      name: 'pets org',
      whatsapp: '+258801471458',
      address: 'Maputo-Provincia',
      email: 'PetsOrg585X@org.co.mz',
      password: await bcrypt.hashSync('any_password', 10),
    })

    expect(() =>
      sut.handle({
        email: 'PetsOrg585X@org.co.mz',
        password: 'any_passwords',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate an org with wrong email', async () => {
    await orgRepository.create({
      name: 'pets org',
      whatsapp: '+258801471458',
      address: 'Maputo-Provincia',
      email: 'PetsOrg585X@org.co.mz',
      password: await bcrypt.hashSync('any_password', 10),
    })

    expect(() =>
      sut.handle({
        email: 'PetsOrg585X@org.co.mzn',
        password: 'any_password',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
