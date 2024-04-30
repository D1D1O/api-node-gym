import { expect, test, describe,it, beforeAll, beforeEach} from 'vitest'
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from './createGymUseCase';

let gymsRepository: inMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(()=>{
    gymsRepository = new inMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  })

  it('should be able create gym', async () => {

    const {gym} =  await sut.execute({
      title: 'Live',
      description: '',
      latitude: 0,
      longitude: 0,
      phone:'',
      photo:''
    });

    expect(gym.id).toEqual(expect.any(String));

  });

});