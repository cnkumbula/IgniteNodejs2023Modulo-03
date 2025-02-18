import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { createAdoption } from './createAdoption.controller'

export async function adoptionRoutes(app: FastifyInstance) {
  app.post('/adoption/create', createAdoption)

  /** authenticated routes*/
  //app.addHook('onRequest', verifyJWT)
  // app.get('/orgs/readOrgProfile', { onRequest: [verifyJWT] }, readOrgProfile)
}
