import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z
    .string()
    .url()
    //.default('postgresql://postgres:postgres@localhost:5432/test_db'),

    .default(() => {
      if (process.env.NODE_ENV === 'test') {
        return 'postgresql://postgres:postgres@localhost:5432/test_db'
      }

      return 'postgresql://postgres:postgres@localhost:5432/petshop'
    }),
  POSTGRES_PASSWORD: z.string().default('postgres'),
  POSTGRES_DB: z.string().default('test_db'),
  POSTGRES_USER: z.string().default('postgres'),
  POSTGRES_DB_PORT: z.coerce.number().default(5432),
  POSTGRES_DB_HOST: z.string().default('localhost'),
})

console.log(`NODE_ENV_28012025: ${process.env.NODE_ENV}`)

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('⚠️ Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables')
}

const env = _env.data
console.log(`env.NODE_ENV: ${env.NODE_ENV}`)

export { env }
