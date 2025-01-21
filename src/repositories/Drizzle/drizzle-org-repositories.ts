import { db } from '@/db'
import { org } from '@/db/schema'
import type { Org, OrgInsert } from '../../../types/drizzle'
import type { OrgsRepository } from '../orgs-repository'
import { eq } from 'drizzle-orm'

export class DrizzleOrgRepository implements OrgsRepository {
  async findByCity(city: string, page: number) {
    const OrgDataSet = await db
      .select()
      .from(org)
      .where(eq(org.address, city))
      .limit(10)
      .offset((page - 1) * 10)

    return OrgDataSet
  }

  async findbyemail(email: string) {
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
  }

  async findbyId(id: string) {
    const existingOrgId = await db
      .select()
      .from(org)
      .where(eq(org.id, id))
      .limit(1)

    return existingOrgId
  }

  async create(data: OrgInsert) {
    const OrgDataSet = await db.insert(org).values(data).returning()

    return OrgDataSet
  }
}
