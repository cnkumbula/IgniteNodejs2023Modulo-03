import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('createOrg(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.skip('should be able to create a org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'pets org e2e',
      whatsapp: '+258820000022',
      address: 'Maputo-Provincia',
      email: 'PetsOrg585XE2E22@org.co.mz',
      password: 'any_password',
    })
    // console.log(response.body)

    expect(response.statusCode).toEqual(201)
  })
})
