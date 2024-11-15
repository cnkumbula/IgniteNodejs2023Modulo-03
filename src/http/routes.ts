import { FastifyInstance } from 'fastify'
import { createOrg } from './controllers/createOrg.controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrg)
}
