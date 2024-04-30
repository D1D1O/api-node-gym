import { expect, test, describe,it, beforeAll, beforeEach} from 'vitest'
import { RegisterUseCAse } from './registerUseCase';
import { compare } from 'bcryptjs';
import { inMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsUseCase } from './search-gymsUseCase';

let gymRepository: inMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search gyms Use Case', () => {
  beforeEach(()=>{
    gymRepository = new inMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymRepository);
  })

  it('should be able to search gyms for the name', async () => {

    await gymRepository.create({
      title: 'Gym 1',
      description: 'Gym 1 description',
      phone: '123456789',
      photo: 'photo',
      latitude: 0,
      longitude: 0,
    })

    await gymRepository.create({
      title: 'Gym 2',
      description: 'Gym 2 description',
      phone: '123456789',
      photo: 'photo',
      latitude: 0,
      longitude: 0,
    });

    const response = await sut.execute({ query: 'Gym 1', page: 1 });

    expect(response.gyms.length).toBe(1);
    expect(response.gyms).toHaveLength(1);

    expect(response.gyms).toEqual([
      expect.objectContaining({title: 'Gym 1'}),
    ]);
  });


  it('should be able to fetch paginated gyms search',async()=>{
    for(let i = 0; i < 30; i++){
      await gymRepository.create({
        title: `Gym ${i}`,
        description: `Gym ${i} description`,
        phone: '123456789',
        photo: 'photo',
        latitude: 0,
        longitude: 0,
      });
    }

    const response = await sut.execute({ query: 'Gym', page: 2 });

    expect(response.gyms.length).toBe(10);
    expect(response.gyms).toHaveLength(10);

    expect(response.gyms).toEqual([
      expect.objectContaining({title: 'Gym 20'}),
      expect.objectContaining({title: 'Gym 21'}),
      expect.objectContaining({title: 'Gym 22'}),
      expect.objectContaining({title: 'Gym 23'}),
      expect.objectContaining({title: 'Gym 24'}),
      expect.objectContaining({title: 'Gym 25'}),
      expect.objectContaining({title: 'Gym 26'}),
      expect.objectContaining({title: 'Gym 27'}),
      expect.objectContaining({title: 'Gym 28'}),
      expect.objectContaining({title: 'Gym 29'}),
    ]);
  });
});