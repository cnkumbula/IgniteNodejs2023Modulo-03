import { db } from '@/db'
import { org } from '@/db/schema'
import type { OrgInsert } from '../../../types/drizzle'
import type { OrgsRepository } from '../orgs-repository'
import { eq } from 'drizzle-orm'

export class DrizzleOrgRepository implements OrgsRepository {
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

  async create(data: OrgInsert) {
    const OrgDataSet = await db.insert(org).values(data).returning()

    return OrgDataSet
  }
}
