import { expect, describe, it, beforeEach } from 'vitest'
import { ReadUserUseCase } from './readUser.useCase'
import bcrypt from 'bcryptjs'
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository'
//import { UserAlreadyExistsError } from '../errors/user-already-exists'

let userRepository: InMemoryUserRepository
let sut: ReadUserUseCase

describe('Read User Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new ReadUserUseCase(userRepository)
  })
  it('should be able to read an user by email', async () => {
    await userRepository.create({
      name: 'Ravi Malik',
      whatsapp: '+258810000000',
      email: 'RaviMalik@email.co.mz',
      password: bcrypt.hashSync('any_password', 10),
    })

    const { user } = await sut.handle({
      userEmail: 'RaviMalik@email.co.mz',
    })

    expect(user).toEqual(
      expect.objectContaining({
        name: 'Ravi Malik',
        whatsapp: '+258810000000',
        email: 'RaviMalik@email.co.mz',
      })
    )
  })
})
