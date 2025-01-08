import type { UserRepository } from '@/repositories/user-repository'
import type { User } from '../../types/drizzle'
import bcrypt from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface CreateUser {
  name: string
  whatsapp: string
  email: string
  password: string
}

interface UserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}
  async handle({
    name,
    whatsapp,
    email,
    password,
  }: CreateUser): Promise<UserUseCaseResponse> {
    const passwordHash = await bcrypt.hash(password, 10)
    const userWithSameEmail = await this.userRepository.findbyemail(email)
    const userWithSameWhatsapp =
      await this.userRepository.findbywhatsapp(whatsapp)

    if (userWithSameEmail.length || userWithSameWhatsapp.length) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      name,
      whatsapp,
      email,
      password: passwordHash,
    })
    return { user: user[0] }
  }
}
