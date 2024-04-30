
import { expect, test, describe,it, beforeAll, beforeEach} from 'vitest'

import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { GetUserMetricsUseCase } from './get-user-metricsUseCase';

let checkInRepository: inMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe('Metrics Use Case', () => {
  beforeEach(()=>{
    checkInRepository = new inMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInRepository);
  })

  it('should be able get metrics', async () => {

    for (let i = 1; i <= 22; i++){
      await checkInRepository.create({
        user_id: '123',
        gym_id: `academia${i}`,
        validated_at: new Date(),
      });
    }

    const {checkins} =  await sut.execute({user_id:'123'});

    expect(checkins).toHaveLength(22);

  });
});