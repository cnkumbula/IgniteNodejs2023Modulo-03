import type { OrgInsert, Org } from '../../types/drizzle'

export interface OrgsRepository {
  findbyemail(email: string): Promise<Org[]>
  findbywhatsapp(whatsapp: string): Promise<Org[]>
  create(data: OrgInsert): Promise<Org[]>
}
