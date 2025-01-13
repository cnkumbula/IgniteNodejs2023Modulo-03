import type { AdoptionRequestRepository } from '../adoptionRequest-repository'
import type {
  AdoptionRequestInsert,
  AdoptionRequest,
} from '../../../types/drizzle'
import { createId } from '@paralleldrive/cuid2'

export class InMemoryAdoptionsRepository implements AdoptionRequestRepository {
  public items: AdoptionRequest[] = []

  async create(data: AdoptionRequestInsert) {
    const adoptions = [
      {
        id: createId(),
        petId: data.petId,
        orgId: data.orgId,
        userId: data.userId,
        adoptiondate: new Date(),
        description: data.description,
      },
    ]

    this.items.push(adoptions[0])

    return adoptions[0]
  }
}
