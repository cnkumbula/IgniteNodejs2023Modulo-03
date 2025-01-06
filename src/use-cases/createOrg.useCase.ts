import type { OrgsRepository } from '@/repositories/orgs-repository'
import type { Org } from '../../types/drizzle'
import bcrypt from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists'

interface CreateOrg {
  name: string
  whatsapp: string
  address: string
  email: string
  password: string
}

interface OrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgsRepository) {}
  async handle({
    name,
    whatsapp,
    address,
    email,
    password,
  }: CreateOrg): Promise<OrgUseCaseResponse> {
    //const passwordHash = await hash(password, 6)
    const passwordHash = await bcrypt.hash(password, 10)

    const orgWithSameEmail = await this.orgRepository.findbyemail(email)
    const orgWithSameWhatsapp =
      await this.orgRepository.findbywhatsapp(whatsapp)

    if (orgWithSameEmail.length || orgWithSameWhatsapp.length) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgRepository.create({
      name,
      whatsapp,
      address,
      email,
      password: passwordHash,
    })
    return { org: org[0] }
  }
}
