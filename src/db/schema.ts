import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const org = pgTable('org', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  whatsapp: text('whatsapp').notNull(),
  address: text('address').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .defaultNow()
    .notNull(),
})

export const pet = pgTable('pet', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  name: text('name').notNull(),
  age: text('age').notNull(),
  sex: text('sex').notNull(),
  size: text('size').notNull(),
  color: text('color').notNull(),
  description: text('description').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .defaultNow()
    .notNull(),
  orgId: text('orgId')
    .notNull()
    .references(() => org.id),
})

export const user = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  whatsapp: text('whatsapp').notNull(),
  orgId: text('orgId')
    .notNull()
    .references(() => org.id),
})

export const adoptionRequest = pgTable('adoptionRequest', {
  id: text('id')
    .primaryKey()
    .$default(() => createId()),
  petId: text('petId')
    .notNull()
    .references(() => pet.id),

  orgId: text('orgId')
    .notNull()
    .references(() => org.id),

  userId: text('userId')
    .notNull()
    .references(() => user.id),

  adoptiondate: timestamp('adoptiondate', { withTimezone: true })
    .defaultNow()
    .notNull(),
  description: text('description').notNull(),
})
