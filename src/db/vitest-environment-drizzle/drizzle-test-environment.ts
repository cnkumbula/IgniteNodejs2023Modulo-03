import type { Environment } from 'vitest'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { randomUUID } from 'node:crypto'

import { env } from '../../env'
import { adoptionRequest, org, pet, user } from '../schema'

export default (<Environment>{
  name: 'custom',
  transformMode: 'ssr',

  async setup() {
    // Connect to PostgreSQL
    const pool = new Pool({
      user: env.POSTGRES_USER,
      host: env.POSTGRES_DB_HOST,
      database: env.POSTGRES_DB,
      password: env.POSTGRES_PASSWORD,
      port: env.POSTGRES_DB_PORT,

      /*      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'postgres',
      port: 5432,*/
    })

    const db = drizzle(pool)

    const schemaName = `test_schema_${randomUUID().replace(/-/g, '_')}`

    // Create schema
    await db.execute(`CREATE SCHEMA ${schemaName}`)

    // Function to be provided to tests to get the schema
    const getTestSchema = () => schemaName

    return {
      getVmContext() {
        return { schema: getTestSchema() }
      },

      teardown: async () => {
        //Drop schema after tests complete
        await db.execute(`DROP SCHEMA ${schemaName} CASCADE`)
      },
    }
  },
})
