import type { OrgsRepository } from '../orgs-repository'
import type { OrgInsert, Org } from '../../../types/drizzle'
import { createId } from '@paralleldrive/cuid2'

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Org[] = []

  async findbyemail(email: string) {
    const org = this.orgs.find(org => org.email === email)

    if (!org) {
      return []
    }

    return [org]
  }

  async findbywhatsapp(whatsapp: string) {
    const org = this.orgs.find(org => org.whatsapp === whatsapp)

    if (!org) {
      return []
    }

    return [org]
  }

  async findbyId(id: string) {
    const org = this.orgs.find(org => org.id === id)

    if (!org) {
      return []
    }

    return [org]
  }
  async create(data: OrgInsert) {
    const org = [
      {
        id: createId(),
        name: data.name,
        whatsapp: data.whatsapp,
        address: data.address,
        email: data.email,
        password: data.password,
        createdAt: new Date(),
      },
    ]

    this.orgs.push(org[0])

    return org
  }
}
