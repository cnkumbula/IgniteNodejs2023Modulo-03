import { expect, describe, it, beforeEach } from 'vitest'
import { CreateUserUseCase } from './createUser.useCase'
import bcrypt from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

let userRepository: InMemoryUserRepository
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new CreateUserUseCase(userRepository)
  })
  it('should be able to create an user', async () => {
    const { user } = await sut.handle({
      name: 'Ravi Malik',
      whatsapp: '+258841111110',
      email: 'RaviMalik@email.co.mz',
      password: 'any_password',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to create an user with same email or whatsapp', async () => {
    const email = 'RaviMalik@email.co.mz'
    const whatsapp = '+258841111110'

    await sut.handle({
      name: 'pets org',
      whatsapp,
      email,
      password: 'any_password',
    })

    await expect(() => {
      return sut.handle({
        name: 'pets org',
        whatsapp,
        email,
        password: 'any_password',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should hash user password', async () => {
    const { user } = await sut.handle({
      name: 'pets org',
      whatsapp: '+258801471458',
      email: 'PetsOrg585X@org.co.mz',
      password: 'any_password',
    })

    const isPasswordCorrectlyHashed = await bcrypt.compare(
      'any_password',
      user.password
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
