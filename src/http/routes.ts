import type { FastifyInstance } from 'fastify'
import { createOrg } from './controllers/createOrg.controller'
import { createPet } from './controllers/createPet.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)
  app.post('/createpet', createPet)
}
//ajs0i05dizzgcbbf8a7fzgh2

//fxcpnof8xdme222f854l9eno

//qt503cvi4wxa6cms7ax9akzj
