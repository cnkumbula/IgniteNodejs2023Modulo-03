import { db } from '@/db'
import { org } from '@/db/schema'
import { OrgInsert } from '../../types/drizzle'

export class DrizzleOrgRepositories {
  async create(data: OrgInsert) {
    const OrdDataSet = await db.insert(org).values(data).returning()

    return OrdDataSet
  }
}
