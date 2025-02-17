import { db } from '@/db'
import { org, pet } from '@/db/schema'
import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Read pet information by city and available status(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.skip('should be able to search a pet by city and available status thats satisfy the given details', async () => {
    const orgs = await db
      .insert(org)
      .values({
        name: 'Maputo Provincia Petshop',
        whatsapp: '+258820000011',
        address: 'Maputo-Provincia',
        email: 'PetsOrg585XE2E33@org.co.mz',
        password: 'any_password',
      })
      .returning({ id: org.id })

    const orgs1 = await db
      .insert(org)
      .values({
        name: 'Maputo Cidade Petshop',
        whatsapp: '+2588200022',
        address: 'maputo-cidade',
        email: 'PetsOrg585XE2E33@org.co.mz',
        password: 'any_password',
      })
      .returning({ id: org.id })

    const orgs2 = await db
      .insert(org)
      .values({
        name: 'Maputo Cidade Petshop 2',
        whatsapp: '+258820000033',
        address: 'maputo-cidade',
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
      name: 'mika',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: orgs[0].id,
      sex: 'male',
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
      orgId: orgs1[0].id,
      sex: 'female',
      size: '25 cm',
      color: 'brown',
    })

    await db.insert(pet).values({
      name: 'douglas',
      age: '1 mes',
      description: 'chow-chow',
      status: 'adopted',
      orgId: orgs1[0].id,
      sex: 'male',
      size: '25 cm',
      color: 'brown',
    })

    await db.insert(pet).values({
      name: 'Denzel',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: orgs2[0].id,
      sex: 'male',
      size: '35 cm',
      color: 'brown',
    })

    await db.insert(pet).values({
      name: 'cisco',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: orgs2[0].id,
      sex: 'male',
      size: '35 cm',
      color: 'brown',
    })

    const response = await request(app.server)
      .get('/pets/readPetByCityAndAvailableStatus')
      .query({ city: 'Maputo-Cidade', page: 1 })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Denzel',
      }),
      expect.objectContaining({
        name: 'cisco',
      }),
    ])
  })
  it.skip('should not be able to search a pet by city and available status thats not satisfy the given details', async () => {
    const response = await request(app.server)
      .get('/pets/readPetByCityAndAvailableStatus')
      .query({ city: 'gaza', page: 1 })
      .send()

    expect(response.statusCode).toEqual(404)
  })
})
