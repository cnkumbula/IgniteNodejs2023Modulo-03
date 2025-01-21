import type { PetInsert, Pet } from '../../types/drizzle'

export interface PetsRepository {
  findById(id: string): Promise<Pet[] | null>
  findByCityAndAvailableStatus(city: string, page: number): Promise<Pet[]>
  findByStatus(status: string, page: number): Promise<Pet[]>
  findByPetDetails(
    description: string, //descrption = race
    sex: string,
    color: string,
    page: number
  ): Promise<Pet[]>
  create(data: PetInsert): Promise<Pet[]>
}
