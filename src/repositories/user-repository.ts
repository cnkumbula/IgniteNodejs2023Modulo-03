import type { UserInsert, User } from '../../types/drizzle'

export interface UserRepository {
  findbyemail(email: string): Promise<User[]>
  findbywhatsapp(whatsapp: string): Promise<User[]>
  findbyId(id: string): Promise<User[]>
  create(data: UserInsert): Promise<User[]>
}
