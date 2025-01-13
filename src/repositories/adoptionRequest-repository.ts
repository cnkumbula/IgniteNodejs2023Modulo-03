import type {
  AdoptionRequestInsert,
  AdoptionRequest,
} from '../../types/drizzle'

export interface AdoptionRequestRepository {
  create(data: AdoptionRequestInsert): Promise<AdoptionRequest>
  //readAdoptionRequests: () => Promise<AdoptionRequest[]>
}
