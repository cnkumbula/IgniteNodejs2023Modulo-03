import { db } from '@/db'
import { user } from '@/db/schema'
import type { UserInsert } from '../../../types/drizzle'
import type { UserRepository } from '../user-repository'
import { eq } from 'drizzle-orm'

export class DrizzleUserRepository implements UserRepository {
  async findbyemail(email: string) {
    const existingUserEmail = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1)

    return existingUserEmail
  }

  async findbywhatsapp(whatsapp: string) {
    const existingUserWhatsapp = await db
      .select()
      .from(user)
      .where(eq(user.whatsapp, whatsapp))
      .limit(1)

    return existingUserWhatsapp
  }

  async findbyId(id: string) {
    const existingUserId = await db
      .select()
      .from(user)
      .where(eq(user.id, id))
      .limit(1)

    return existingUserId
  }

  async create(data: UserInsert) {
    const UserDataSet = await db.insert(user).values(data).returning()

    return UserDataSet
  }
}
