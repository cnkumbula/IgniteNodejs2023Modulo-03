import { db } from '@/db'
import { pet } from '@/db/schema'
import type { PetInsert } from '../../../types/drizzle'
import type { PetsRepository } from '../pets-repository'
import { eq } from 'drizzle-orm'

export class DrizzlePetRepository implements PetsRepository {
  /*async findbyemail(email: string) {
    const existingOrgEmail = await db
      .select()
      .from(org)
      .where(eq(org.email, email))
      .limit(1)

    return existingOrgEmail
  }

  async findbywhatsapp(whatsapp: string) {
    const existingOrgWhatsapp = await db
      .select()
      .from(org)
      .where(eq(org.whatsapp, whatsapp))
      .limit(1)

    return existingOrgWhatsapp
  }*/

  async create(data: PetInsert) {
    const PetDataSet = await db.insert(pet).values(data).returning()

    return PetDataSet
  }
}
