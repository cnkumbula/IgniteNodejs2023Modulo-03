import type { PetsRepository } from '@/repositories/pets-repository'

interface CreatePet {
  name: string
  age: string
  sex: string
  size: string
  color: string
  description: string
  status: string
  orgId: string
}

export class CreatePetUseCase {
  constructor(private petRepository: PetsRepository) {}
  async handle({
    name,
    age,
    sex,
    size,
    color,
    description,
    status,
    orgId,
  }: CreatePet) {
    const pet = await this.petRepository.create({
      name,
      age,
      sex,
      size,
      color,
      description,
      status,
      orgId,
    })
    return { pet }
  }
}
