import { db } from '@/db'
import { adoptionRequest } from '@/db/schema'
import type { AdoptionRequestInsert } from '../../../types/drizzle'
import type { AdoptionRequestRepository } from '../adoptionRequest-repository'

export class DrizzleAdoptionsRepository implements AdoptionRequestRepository {
  async create(data: AdoptionRequestInsert) {
    const adoptionDataSet = await db
      .insert(adoptionRequest)
      .values(data)
      .returning()

    return adoptionDataSet[0]
  }
}
