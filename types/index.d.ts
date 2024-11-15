import {
  AdoptionRequest,
  AdoptionRequestInsert,
  Org,
  OrgInsert,
  User,
  UserInsert,
} from './drizzle'

// Tornar tipos globais disponíveis
declare global {
  type AdoptionRequest = AdoptionRequest
  type AdoptionRequestInsert = AdoptionRequestInsert
  type Org = Org
  type OrgInsert = OrgInsert
  type User = User
  type UserInsert = UserInsert
}
