import { db } from '@/db'
import { org } from '@/db/schema'
// import { InferModel } from 'drizzle-orm'
import { OrgInsert } from '../../types/drizzle'

export class DrizzleOrgRepositories {
  async create(data: OrgInsert) {
    const OrdDataSet = await db
      .insert(org)
      .values(data)
      /* name,
        whatsapp,
        address,
        email,
        password,
        // password: passwordHash, 
      
      }) */
      .returning()

    return OrdDataSet
  }
}
