import { InferModel } from 'drizzle-orm'
import { adoptionRequest, org, pet, user } from '@/db/schema'

// Tipos para a tabela `org`
export type Org = InferModel<typeof org> // SELECT
export type OrgInsert = InferModel<typeof org, 'insert'> // INSERT

// Tipos para a tabela `user`
export type User = InferModel<typeof user> // SELECT
export type UserInsert = InferModel<typeof user, 'insert'> // INSERT

// Tipos para a tabela `adoptionRequest`
export type AdoptionRequest = InferModel<typeof adoptionRequest> // SELECT
export type AdoptionRequestInsert = InferModel<typeof adoptionRequest, 'insert'> // INSERT

// Tipos para a tabela `pet`
export type Pet = InferModel<typeof pet> // SELECT
export type PetInsert = InferModel<typeof pet, 'insert'> // INSERT
