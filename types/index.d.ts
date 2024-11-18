import {
  AdoptionRequest,
  AdoptionRequestInsert,
  AdoptionRequestUpdate,
  AdoptionRequestDelete,
  Org,
  OrgInsert,
  OrgUpdate,
  OrgDelete,
  User,
  UserInsert,
  UserUpdate,
  UserDelete,
} from './drizzle'

// Tornar tipos globais disponíveis
declare global {
  type AdoptionRequest = AdoptionRequest
  type AdoptionRequestInsert = AdoptionRequestInsert
  type AdoptionRequestUpdate = AdoptionRequestUpdate
  type AdoptionRequestDelete = AdoptionRequestDelete

  type Org = Org
  type OrgInsert = OrgInsert
  type OrgUpdate = OrgUpdate
  type OrgDelete = OrgDelete

  type User = User
  type UserInsert = UserInsert
  type UserUpdate = UserUpdate
  type UserDelete = UserDelete
}
