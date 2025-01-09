import type { PetInsert, Pet } from '../../types/drizzle'

interface PetAndOrg {
  pets: {
    id: string
    name: string
    age: string
    description: string
    status: string
    orgId: string
    createdAt: Date
    sex: string
    size: string
    color: string
  }[]
  orgs: {
    id: string
    name: string
    email: string
    whatsapp: string
    address: string
  }[]
}
export interface PetsRepository {
  findById(id: string): Promise<Pet[] | null>
  findByCity(query: string /*, page: number*/): Promise<PetAndOrg>
  findByStatus(status: string): Promise<Pet[]>
  findByPetDetails(details: string): Promise<Pet[]>
  create(data: PetInsert): Promise<Pet[]>
}
/*
findByCity
findByStatus
findByPetDetails
findByPetDetails (Sex, Race, Age, Color)*/
