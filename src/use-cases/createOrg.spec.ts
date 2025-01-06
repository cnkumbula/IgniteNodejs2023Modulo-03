import { expect, describe, it } from 'vitest'
import { CreateOrgUseCase } from './createOrg.useCase'
import bcrypt from 'bcryptjs'
import { createId } from '@paralleldrive/cuid2'

describe('Create Org Use Case', () => {
  it('should hash org password', async () => {
    //const sut = new CreateOrgUseCase(new DrizzleOrgRepository())
    // const drizzleOrgRepository = new DrizzleOrgRepository()
    //const sut = new CreateOrgUseCase(drizzleOrgRepository)

    const createOrgUseCase = new CreateOrgUseCase({
      async findbyemail(email) {
        return []
      },
      async findbywhatsapp(whatsapp) {
        return []
      },
      async create(data) {
        return [
          {
            id: createId(),
            name: data.name,
            whatsapp: data.whatsapp,
            address: data.address,
            email: data.email,
            password: data.password,
            createdAt: new Date(),
          },
        ]
      },
    })

    const { org } = await createOrgUseCase.handle({
      name: 'pets org',
      whatsapp: '+258801471458',
      address: 'Maputo-Provinci',
      email: 'PetsOrg585X@org.co.mz',
      password: 'any_password',
    })

    const isPasswordCorrectlyHashed = await bcrypt.compare(
      'any_password',
      org.password
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
