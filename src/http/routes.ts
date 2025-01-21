import type { FastifyInstance } from 'fastify'
import { createOrg } from './controllers/createOrg.controller'
import { createPet } from './controllers/createPet.controller'
import { authenticateOrg } from './controllers/authenticateOrg.controller'
import { readOrgProfile } from './controllers/readOrgProfile.controller'
import { verifyJWT } from './middlewares/verify-jwt'
//import { readPet } from './controllers/readPet.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)
  app.post('/createpet', createPet)
  app.post('/authentication', authenticateOrg)

  //app.get('/findpetByCity/:q', readPet)

  //app.get('/pets/status/:query', readPet)

  /** authenticated routes*/
  app.get('/orgs/readOrgProfile', { onRequest: [verifyJWT] }, readOrgProfile)
}
