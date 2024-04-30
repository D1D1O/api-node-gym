
import { expect, test, describe,it, beforeAll, beforeEach} from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gymsUseCase';

let gymRepository: inMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Search gyms Use Case', () => {
  beforeEach(()=>{
    gymRepository = new inMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymRepository);
  })

  it('should be able to fetch nearby gyms', async () => {


    //-3.073817, -60.031578


    await gymRepository.create({
      title: 'Near 1',
      description: 'Gym 1 description',
      phone: '123456789',
      photo: 'photo',
      latitude: -3.073817,
      longitude: -60.031578,
    })

    //-2.060891, -60.024684
    await gymRepository.create({
      title: 'Far 2',
      description: 'Gym 2 description',
      phone: '123456789',
      photo: 'photo',
      latitude: -2.060891,
      longitude: -60.024684,
    });

    //-3.073162, -60.037527
    const response = await sut.execute({ userlatitude: -3.073162, userlongitude: -60.037527, page: 1});

    expect(response.gyms.length).toBe(1);
    expect(response.gyms).toHaveLength(1);
  });



});
