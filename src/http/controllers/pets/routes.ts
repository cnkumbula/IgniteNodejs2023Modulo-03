import type { FastifyInstance } from 'fastify'

import { createPet } from './createPet.controller'
import { readPetById } from './readPetByID.controller'
import { readPetByStatus } from './readPetByStatus.controller'

export async function petRoutes(app: FastifyInstance) {
  app.post('/createpet', createPet)

  app.get('/pets/readPetByID/:petId', readPetById)
  app.get('/pets/readPetByStatus', readPetByStatus)

  /** authenticated routes*/
}
