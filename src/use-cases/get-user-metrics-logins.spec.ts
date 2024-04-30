
import { expect, test, describe,it, beforeAll, beforeEach} from 'vitest'

import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
//import { GetUserMetricsUseCase } from './get-user-metricsUseCase';
import { GetUserMetricsLoginUseCase } from './get-user-metrics-loginsUseCase';

let checkInRepository: inMemoryCheckInsRepository;
let sut: GetUserMetricsLoginUseCase;

describe('Metrics Login Use Case', () => {
  beforeEach(()=>{
    checkInRepository = new inMemoryCheckInsRepository();
    sut = new GetUserMetricsLoginUseCase(checkInRepository);
  })

  it('should be able get login counts metrics', async () => {

    for (let i = 1; i <= 22; i++){
      await checkInRepository.create({
        user_id: '123',
        gym_id: `academia${i}`,
        validated_at: new Date(),
      });
    }

    const {checkins} =  await sut.execute({user_id:'123'});

    expect(checkins).toEqual(22);

  });
});