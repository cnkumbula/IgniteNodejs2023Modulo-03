import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { db } from '@/db'

describe('OrgProfile(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.skip('should be able to get org profile', async () => {
    await request(app.server).post('/orgs').send({
      name: 'pets org e2e',
      whatsapp: '+258820000044',
      address: 'Maputo-Provincia',
      email: 'petsorg585xe2e44@org.co.mz',
      password: 'any_password',
    })

    const authResponse = await request(app.server)
      .post('/authentication')
      .send({
        email: 'petsorg585xe2e44@org.co.mz',
        password: 'any_password',
      })

    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/orgs/readOrgProfile')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.org).toEqual(
      expect.objectContaining({
        email: 'petsorg585xe2e44@org.co.mz',
      })
    )
  })
})
