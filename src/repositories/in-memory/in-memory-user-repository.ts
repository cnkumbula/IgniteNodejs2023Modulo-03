import type { UserRepository } from '../user-repository'
import type { UserInsert, User } from '../../../types/drizzle'
import { createId } from '@paralleldrive/cuid2'

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = []

  async findbyemail(email: string) {
    const user = this.users.find(user => user.email === email)

    if (!user) {
      return []
    }

    return [user]
  }

  async findbywhatsapp(whatsapp: string) {
    const user = this.users.find(user => user.whatsapp === whatsapp)

    if (!user) {
      return []
    }

    return [user]
  }

  async findbyId(id: string) {
    const user = this.users.find(user => user.id === id)

    if (!user) {
      return []
    }

    return [user]
  }
  async create(data: UserInsert) {
    const user = [
      {
        id: createId(),
        name: data.name,
        whatsapp: data.whatsapp,
        email: data.email,
        password: data.password,
        createdAt: new Date(),
      },
    ]

    this.users.push(user[0])

    return user
  }
}
