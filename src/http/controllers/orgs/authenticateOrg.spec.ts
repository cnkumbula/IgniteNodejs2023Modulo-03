import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('AuthenticateOrg(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.skip('should be able to authenticate an org', async () => {
    await request(app.server).post('/orgs').send({
      name: 'pets org e2e',
      whatsapp: '+258820000011',
      address: 'Maputo-Provincia',
      email: 'PetsOrg585XE2E11@org.co.mz',
      password: 'any_password',
    })

    const response = await request(app.server).post('/authentication').send({
      email: 'PetsOrg585XE2E11@org.co.mz',
      password: 'any_password',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
