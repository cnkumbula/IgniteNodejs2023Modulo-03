//import { test } from 'vitest'
import { db } from '@/db'
import { org } from '@/db/schema'
import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

import { DrizzleOrgRepository } from '@/repositories/Drizzle/drizzle-org-repositories'

let orgRepository: DrizzleOrgRepository

describe('createPet(e2e)', () => {
  beforeAll(async () => {
    orgRepository = new DrizzleOrgRepository()
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.skip('should be able to create a pet', async () => {
    await db.insert(org).values({
      name: 'pets org e2e',
      whatsapp: '+258820000033',
      address: 'Maputo-Provincia',
      email: 'PetsOrg585XE2E33@org.co.mz',
      password: 'any_password',
    })

    const getOrg = await orgRepository.findbyemail('PetsOrg585XE2E33@org.co.mz')

    const response = await request(app.server).post('/createpet').send({
      name: 'melted',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: getOrg[0].id,
      sex: 'female',
      size: '25 cm',
      color: 'white',
    })

    expect(response.statusCode).toEqual(201)
  })
})
