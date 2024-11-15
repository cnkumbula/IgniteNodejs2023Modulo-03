import { db } from '@/db'
import { org } from '@/db/schema'
import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { DrizzleOrgRepositories } from '@/repositories/drizzle-org-repositories'

interface CreateOrg {
  name: string
  whatsapp: string
  address: string
  email: string
  password: string
}

export async function createOrgUseCase({
  name,
  whatsapp,
  address,
  email,
  password,
}: CreateOrg) {
  const passwordHash = await hash(password, 6)

  const existingOrg = await db
    .select()
    .from(org)
    .where(eq(org.email, email))
    .limit(1)

  if (existingOrg.length) {
    throw new Error('Email already exists')
  }

  /* const result = await db
    .insert(org)
    .values({
      name,
      whatsapp,
      address,
      email,
      password: passwordHash,
    })
    .returning()

  const orgResult = result[0]

  return { orgResult } */

  const drizzleOrgRepositories = new DrizzleOrgRepositories()

  await drizzleOrgRepositories.create({
    name,
    whatsapp,
    address,
    email,
    password: passwordHash,
  })
}

// DrizzleOrgRepositories
