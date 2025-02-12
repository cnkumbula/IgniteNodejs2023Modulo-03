//import { test } from 'vitest'

import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { db } from '@/db'

describe('createUser(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
    // await db.execute('Truncate table "org" CASCADE')
  })

  afterAll(async () => {
    await app.close()
  })

  it.skip('should be able to create a User', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Ravi Malik Nkumbula',
      email: 'ravi.nkumbula@email.co.mz',
      password: 'any_password',
      whatsapp: '+258810000011',
    })

    expect(response.statusCode).toEqual(201)
  })
})
