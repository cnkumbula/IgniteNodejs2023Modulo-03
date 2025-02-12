//import { test } from 'vitest'

import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { db } from '@/db'
import { user } from '@/db/schema'

describe('readUser(e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.skip('should be able to get a User', async () => {
    await db.insert(user).values({
      name: 'Ravi Malik Nkumbula',
      email: 'ravi.nkumbula@email.co.mz',
      password: 'any_password',
      whatsapp: '+258810000001',
    })

    const getUserResponse = await request(app.server)
      .get('/users/readUser')
      .query({ q: 'ravi.nkumbula@email.co.mz' })
      .send()

    expect(getUserResponse.body.user).toEqual(
      expect.objectContaining({
        name: 'Ravi Malik Nkumbula',
        email: 'ravi.nkumbula@email.co.mz',
      })
    )
  })
})
