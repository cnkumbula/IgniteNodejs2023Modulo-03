import { InferModel } from 'drizzle-orm'
import { adoptionRequest, org, pet, user } from '@/db/schema'

// Tipos para a tabela `org`
export type Org = InferModel<typeof org> // SELECT
export type OrgInsert = InferModel<typeof org, 'insert'> // INSERT
export type OrgUpdate = InferModel<typeof org, 'update'> // UPDATE
export type OrgDelete = InferModel<typeof org, 'delete'> // DELETE

// Tipos para a tabela `user`
export type User = InferModel<typeof user> // SELECT
export type UserInsert = InferModel<typeof user, 'insert'> // INSERT
export type UserUpdate = InferModel<typeof user, 'update'> // UPDATE
export type UserDelete = InferModel<typeof user, 'delete'> // DELETE

// Tipos para a tabela `adoptionRequest`
export type AdoptionRequest = InferModel<typeof adoptionRequest> // SELECT
export type AdoptionRequestInsert = InferModel<typeof adoptionRequest, 'insert'> // INSERT
export type AdoptionRequestUpdate = InferModel<typeof adoptionRequest, 'update'> // UPDATE
export type AdoptionRequestDelete = InferModel<typeof adoptionRequest, 'delete'> // DELETE

// Tipos para a tabela `pet`
export type Pet = InferModel<typeof pet> // SELECT
export type PetInsert = InferModel<typeof pet, 'insert'> // INSERT
export type PetUpdate = InferModel<typeof pet, 'update'> // UPDATE
export type PetDelete = InferModel<typeof pet, 'delete'> // DELETE
