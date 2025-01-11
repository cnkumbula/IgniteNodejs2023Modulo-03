import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { ReadPetByIdUseCase } from './readPetById.useCase'
import { ResourceNotFoundErrors } from '../errors/resource-not-found-errors'

let petRepository: InMemoryPetsRepository
let sut: ReadPetByIdUseCase

describe('Read pet information by id use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository()
    sut = new ReadPetByIdUseCase(petRepository)
  })
  it('should be able to read a pet by id', async () => {
    const createdPet = await petRepository.create({
      name: 'melted',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: 'ajs0i05dizzgcbbf8a7fzgh2',
      createdAt: new Date(),
      sex: 'female',
      size: '25 cm',
      color: 'white',
    })

    const { pet } = await sut.handle({
      petId: createdPet[0].id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('melted')
  })

  it('should not be able to read a pet with wrong id', async () => {
    await expect(() =>
      sut.handle({
        petId: 'bp4hsvdhlmlbxydkck1zntkr',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundErrors)
  })
})
