import type { OrgInsert, Org } from '../../types/drizzle'

export interface OrgsRepository {
  findbyemail(email: string): Promise<Org[]>
  findbywhatsapp(whatsapp: string): Promise<Org[]>
  findbyId(id: string): Promise<Org[]>
  findByCity(city: string, page: number): Promise<Org[]>
  create(data: OrgInsert): Promise<Org[]>
}
