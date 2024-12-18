import type { PetInsert, Pet } from '../../types/drizzle'

export interface PetsRepository {
  //findbyemail(email: string): Promise<Org[]>
  //findbywhatsapp(whatsapp: string): Promise<Org[]>
  create(data: PetInsert): Promise<Pet[]>
}
