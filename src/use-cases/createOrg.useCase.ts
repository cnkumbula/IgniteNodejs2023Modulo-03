import type { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'

interface CreateOrg {
  name: string
  whatsapp: string
  address: string
  email: string
  password: string
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgsRepository) {}
  async handle({ name, whatsapp, address, email, password }: CreateOrg) {
    const passwordHash = await hash(password, 6)

    const orgWithSameEmail = await this.orgRepository.findbyemail(email)
    const orgWithSameWhatsapp =
      await this.orgRepository.findbywhatsapp(whatsapp)

    if (orgWithSameEmail.length || orgWithSameWhatsapp.length) {
      throw new Error('Email already exists or whatsapp already exists')
    }

    await this.orgRepository.create({
      name,
      whatsapp,
      address,
      email,
      password: passwordHash,
    })
  }
}
