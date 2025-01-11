import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { ReadPetByStatusUseCase } from './readPetByStatus.useCase'

import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let petRepository: InMemoryPetsRepository
let sut: ReadPetByStatusUseCase

let orgRepository: InMemoryOrgsRepository

describe('Read pet information by status use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetsRepository(orgRepository)
    sut = new ReadPetByStatusUseCase(petRepository)

    orgRepository = new InMemoryOrgsRepository()
  })
  it('should be able to read a pet by id', async () => {
    await petRepository.create({
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

    await petRepository.create({
      name: 'Rossi',
      age: '1 mes',
      description: 'chow-chow',
      status: 'available',
      orgId: 'ajs0i05dizzgcbbf8a7fzgh2',
      createdAt: new Date(),
      sex: 'male',
      size: '25 cm',
      color: 'white',
    })

    await petRepository.create({
      name: 'Silky',
      age: '1 mes',
      description: 'chow-chow',
      status: 'adopted',
      orgId: 'ajs0i05dizzgcbbf8a7fzgh2',
      createdAt: new Date(),
      sex: 'female',
      size: '25 cm',
      color: 'Brown',
    })

    const { pets } = await sut.handle({
      query: 'available',
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'melted' }),
      expect.objectContaining({ name: 'Rossi' }),
    ])
  })
})
