//import { test } from 'vitest'
import { db } from '@/db'
import { org, pet } from '@/db/schema'
import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('read pet by given details(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a pet by given details', async () => {
    const orgs = await db
      .insert(org)
      .values({
        name: 'pets org e2e',
        whatsapp: '+258820000033',
        address: 'Maputo-Provincia',
        email: 'PetsOrg585XE2E33@org.co.mz',
        password: 'any_password',
      })
      .returning({ id: org.id })

    await db.insert(pet).values({
      name: 'melted',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: orgs[0].id,
      sex: 'female',
      size: '25 cm',
      color: 'white',
    })

    await db.insert(pet).values({
      name: 'Newton',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: orgs[0].id,
      sex: 'male',
      size: '25 cm',
      color: 'brown',
    })

    await db.insert(pet).values({
      name: 'Grish',
      age: '1 mes',
      description: 'chow-chow',
      status: 'adopted',
      orgId: orgs[0].id,
      sex: 'female',
      size: '25 cm',
      color: 'brown',
    })

    await db.insert(pet).values({
      name: 'Denzel',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: orgs[0].id,
      sex: 'male',
      size: '35 cm',
      color: 'brown',
    })

    const response = await request(app.server)
      .get('/pets/readPetByDetails')
      .query({ description: 'chow-chow', sex: 'male', color: 'Brown', page: 1 })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Newton',
      }),
      expect.objectContaining({
        name: 'Denzel',
      }),
    ])
  })
})
