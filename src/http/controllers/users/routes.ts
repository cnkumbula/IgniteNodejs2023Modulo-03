import type { FastifyInstance } from 'fastify'

import { createUser } from './createUser.controller'
import { readUser } from './readUser.controller'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUser)

  app.get('/users/readUser', readUser)

  /** authenticated routes*/
}
