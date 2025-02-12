import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('OrgProfileByCity(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.skip('should be able to get org profile by city', async () => {
    await request(app.server).post('/orgs').send({
      name: 'pets org1 e2e',
      whatsapp: '+258820000011',
      address: 'Maputo-Provincia',
      email: 'petsorgMP1@org.co.mz',
      password: 'any_password',
    })

    await request(app.server).post('/orgs').send({
      name: 'pets org2 e2e',
      whatsapp: '+258820000022',
      address: 'Maputo-Provincia',
      email: 'petsorgMP2@org.co.mz',
      password: 'any_password',
    })

    await request(app.server).post('/orgs').send({
      name: 'pets org3 e2e',
      whatsapp: '+258820000033',
      address: 'Maputo-Cidade',
      email: 'petsorg585xe2e44@org.co.mz',
      password: 'any_password',
    })

    const orgProfileByCityResponse = await request(app.server)
      .get('/orgs/readOrgProfileByCity')
      .query({ q: 'Maputo-Provincia', page: 1 })
      .send()

    expect(orgProfileByCityResponse.statusCode).toEqual(200)
    expect(orgProfileByCityResponse.body.orgs).toEqual([
      expect.objectContaining({
        name: 'pets org1 e2e',
        email: 'petsorgmp1@org.co.mz',
      }),
      expect.objectContaining({
        name: 'pets org2 e2e',
        email: 'petsorgmp2@org.co.mz',
      }),
    ])
  })
})
