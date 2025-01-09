import { db } from '@/db'
import { pet, org } from '@/db/schema'
import type { Pet, Org, PetInsert, OrgInsert } from '../../../types/drizzle'
import type { PetsRepository } from '../pets-repository'
import { eq, like } from 'drizzle-orm'

export class DrizzlePetRepository implements PetsRepository {
  findById(id: string): Promise<Pet[] | null> {
    throw new Error('Method not implemented.')
  }
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

  /*findByStatus(status: string): Promise<Pet[]> {
    throw new Error('Method not implemented.')
  }*/

  async findByStatus(status: string) {
    const PetDataSet = await db
      .select(
        /*{
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
      }*/
      )
      .from(pet)
      .where(eq(pet.status, status))

    return PetDataSet //.map(row => row.pet)
  }

  findByPetDetails(details: string): Promise<Pet[]> {
    throw new Error('Method not implemented.')
  }
  /*async findbyemail(email: string) {
    const existingOrgEmail = await db
      .select()
      .from(org)
      .where(eq(org.email, email))
      .limit(1)

    return existingOrgEmail
  }*/

  async create(data: PetInsert) {
    const PetDataSet = await db.insert(pet).values(data).returning()

    return PetDataSet
  }
}
