import request from 'supertest'
import { app } from '@/app'
import { db } from '@/db'
import { org, pet, user } from '@/db/schema'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('create adoption(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an adotion', async () => {
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

    const user1 = await db
      .insert(user)
      .values({
        name: 'Hadassah Naomi Nkumbula',
        email: 'Hadassah.nkumbula@email.co.mz',
        password: 'any_password',
        whatsapp: '+258810000001',
      })
      .returning({ id: org.id })

    const user2 = await db
      .insert(user)
      .values({
        name: 'Ravi Malik Nkumbula',
        email: 'ravi.nkumbula@email.co.mz',
        password: 'any_password',
        whatsapp: '+258810000002',
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
      .returning({ id: org.id })

    const pet2 = await db
      .insert(pet)
      .values({
        name: 'mika',
        age: '1 mes',
        description: 'chow-chow',
        status: 'available',
        orgId: orgs[0].id,
        sex: 'male',
        size: '25 cm',
        color: 'white',
      })
      .returning({ id: org.id })

    const pet3 = await db
      .insert(pet)
      .values({
        name: 'Newton',
        age: '1 mes',
        description: 'chow-chow',
        status: 'available',
        orgId: orgs[0].id,
        sex: 'male',
        size: '25 cm',
        color: 'brown',
      })
      .returning({ id: org.id })

    const pet4 = await db
      .insert(pet)
      .values({
        name: 'Grish',
        age: '1 mes',
        description: 'chow-chow',
        status: 'adopted',
        orgId: orgs1[0].id,
        sex: 'female',
        size: '25 cm',
        color: 'brown',
      })
      .returning({ id: org.id })

    const pet5 = await db
      .insert(pet)
      .values({
        name: 'douglas',
        age: '1 mes',
        description: 'chow-chow',
        status: 'adopted',
        orgId: orgs1[0].id,
        sex: 'male',
        size: '25 cm',
        color: 'brown',
      })
      .returning({ id: org.id })

    const pet6 = await db
      .insert(pet)
      .values({
        name: 'Denzel',
        age: '1 mes',
        description: 'chow-chow',
        status: 'available',
        orgId: orgs1[0].id,
        sex: 'male',
        size: '35 cm',
        color: 'brown',
      })
      .returning({ id: org.id })

    const response = await request(app.server)
      //.post(`/adoption/${orgs[0].id}/create`)
      .post('/adoption/create')
      .send({
        orgId: orgs[0].id,
        petId: pet2[0].id,
        userId: user2[0].id,
        description: 'adoption description',
      })

    console.log(response.body)

    console.log(`orgs[0].id: ${orgs[0].id}`)
    console.log(`pet2[0].id: ${pet2[0].id}`)
    console.log(`user2[0].id: ${user2[0].id}`)

    expect(response.statusCode).toEqual(201)
  })
})
