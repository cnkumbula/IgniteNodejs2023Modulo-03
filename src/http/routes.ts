import type { FastifyInstance } from 'fastify'
import { createOrg } from './controllers/createOrg.controller'
import { createPet } from './controllers/createPet.controller'
import { authenticateOrg } from './controllers/authenticateOrg.controller'
import { readPet } from './controllers/readPet.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)
  app.post('/createpet', createPet)
  app.post('/authentication', authenticateOrg)

  //app.get('/findpetByCity/:q', readPet)
  app.get('/pets/status/:query', readPet)
}
//ajs0i05dizzgcbbf8a7fzgh2

//fxcpnof8xdme222f854l9eno

//qt503cvi4wxa6cms7ax9akzj
