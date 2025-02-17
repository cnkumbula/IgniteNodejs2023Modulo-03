//import { test } from 'vitest'
import { db } from '@/db'
import { org, pet } from '@/db/schema'
import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

import { DrizzleOrgRepository } from '@/repositories/Drizzle/drizzle-org-repositories'

let orgRepository: DrizzleOrgRepository

describe('read pet by id (e2e)', () => {
  beforeAll(async () => {
    orgRepository = new DrizzleOrgRepository()
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.skip('should be able to search a pet by id', async () => {
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

    const pet1 = await db
      .insert(pet)
      .values({
        name: 'melted',
        age: '1 mes',
        description: 'chow-chow',
        status: 'available',
        orgId: orgs[0].id,
        sex: 'female',
        size: '25 cm',
        color: 'white',
      })
      .returning({ id: pet.id })

    console.log(`pet1[0].id:${pet1[0].id}`)

    const response = await request(app.server)
      .get(`/pets/readPetByID/${pet1[0].id}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      pet: expect.objectContaining({ name: 'melted' }),
    })
  })

  it.skip('should not be able to read a pet with wrong id', async () => {
    const response = await request(app.server).get('/pets/readPetByID/1').send()

    expect(response.statusCode).toEqual(404)
  })
})
