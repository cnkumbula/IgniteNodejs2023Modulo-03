import { env } from '../../env'

import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest'

import { execSync } from 'node:child_process'

import { db } from '@/db' // Make sure db is correctly configured

function generateDatabaseUrl(schema: string) {
  if (!env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default (<Environment>{
  name: 'drizzle',
  transformMode: 'ssr',

  async setup() {
    console.log('setup')
    // const schema = randomUUID()
    // const schema = `test_${randomUUID().replace(/-/g, '_')}`
    //const schema = 'public'

    //const databaseURL = generateDatabaseUrl(schema)
    const databaseURL = 'postgresql://postgres:postgres@localhost:5432/test_db'
    env.DATABASE_URL = databaseURL

    //await db.execute('CREATE SCHEMA IF NOT EXISTS public;')

    //execSync('npx drizzle-kit push')
    //execSync('npx drizzle-kit generate')
    execSync('npx drizzle-kit migrate')

    console.log('Database URL:', env.DATABASE_URL)

    return {
      async teardown() {
        console.log('teardown')

        await db.execute('Truncate table "org" CASCADE')
        await db.execute('Truncate table "user" CASCADE')
        await db.execute('Truncate table "pet" CASCADE')
        await db.execute('Truncate table "adoptionRequest"')
        //await db.execute('DROP SCHEMA IF EXISTS public CASCADE;')
      },
    }
  },
})
