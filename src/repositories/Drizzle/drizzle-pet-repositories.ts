import { db } from '@/db'
import { pet, org } from '@/db/schema'
import type { Pet, Org, PetInsert, OrgInsert } from '../../../types/drizzle'
import type { PetsRepository } from '../pets-repository'
import { and, eq, like } from 'drizzle-orm'

export class DrizzlePetRepository implements PetsRepository {
  async findByCity(city: string) {
    const PetDataSet = await db
      .select({
        pet: {
          id: pet.id,
          name: pet.name,
          age: pet.age,
          description: pet.description,
          status: pet.status,
          orgId: pet.orgId,
          createdAt: pet.createdAt,
          sex: pet.sex,
          size: pet.size,
          color: pet.color,
        },
        org: {
          id: org.id,
          name: org.name,
          email: org.email,
          whatsapp: org.whatsapp,
          address: org.address,
        },
      })
      .from(pet)
      .innerJoin(org, eq(pet.orgId, org.id))
      .where(like(org.address, city))

    return {
      pets: PetDataSet.map(row => row.pet),
      orgs: PetDataSet.map(row => row.org),
    }
  }

  async findByStatus(status: string) {
    const PetDataSet = await db.select().from(pet).where(eq(pet.status, status))

    return PetDataSet
  }

  async findByPetDetails(
    description: string,
    sex: string,
    color: string,
    page: number
  ) {
    const PetDataSet = await db
      .select()
      .from(pet)
      .where(
        eq(pet.description, description) &&
          eq(pet.sex, sex) &&
          eq(pet.color, color) &&
          eq(pet.status, 'available')
      )
      .limit(10)
      .offset((page - 1) * 10)

    return PetDataSet
  }

  async findByCityAndAvailableStatus(city: string, page: number) {
    const PetDataSet = await db
      .select()
      .from(pet)
      .where(eq(pet.status, 'available'))
      .limit(10)
      .offset((page - 1) * 10)

    return PetDataSet
  }

  async findById(id: string) {
    const PetDataSet = db.select().from(pet).where(eq(pet.id, id))

    return PetDataSet
  }

  async create(data: PetInsert) {
    const PetDataSet = await db.insert(pet).values(data).returning()

    return PetDataSet
  }
}
