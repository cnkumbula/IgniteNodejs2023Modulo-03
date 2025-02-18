import fastify from 'fastify'

import { orgRoutes } from './http/controllers/orgs/routes'
import { petRoutes } from './http/controllers/pets/routes'
import { userRoutes } from './http/controllers/users/routes'
import { adoptionRoutes } from './http/controllers/adoption/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(orgRoutes)
app.register(petRoutes)
app.register(userRoutes)
app.register(adoptionRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})
