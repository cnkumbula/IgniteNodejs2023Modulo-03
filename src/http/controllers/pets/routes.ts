import type { FastifyInstance } from 'fastify'

import { createPet } from './createPet.controller'

export async function petRoutes(app: FastifyInstance) {
  app.post('/createpet', createPet)

  /** authenticated routes*/
}
