import type { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { createOrg } from './createOrg.controller'
import { authenticateOrg } from './authenticateOrg.controller'
import { readOrgProfile } from './readOrgProfile.controller'
import { readOrgProfileByCity } from './readOrgProfileByCity.controler'

export async function orgRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)
  app.post('/authentication', authenticateOrg)
  app.get('/orgs/readOrgProfileByCity', readOrgProfileByCity)
  /** authenticated routes*/
  //app.addHook('onRequest', verifyJWT)
  app.get('/orgs/readOrgProfile', { onRequest: [verifyJWT] }, readOrgProfile)
}
