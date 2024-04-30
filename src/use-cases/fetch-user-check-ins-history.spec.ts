import { expect, test, describe,it, beforeAll, beforeEach, vi, afterEach} from 'vitest'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';

import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-historyUseCase';

let checkInsRepository: inMemoryCheckInsRepository;
let sut: FetchUserCheckInsHistoryUseCase;

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async ()=>{
    checkInsRepository = new inMemoryCheckInsRepository();
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(()=>{
    vi.useRealTimers();
  });

  it('should be able to fetch check-in history', async () => {

    await checkInsRepository.create({
      user_id: '123',
      gym_id: 'academia1',
      validated_at: new Date(),
    });

    await checkInsRepository.create({
      user_id: '123',
      gym_id: 'academia2',
      validated_at: new Date(),
    });

    const {checkIns } = await sut.execute({
      userId: '123',
      page:1
    });

    expect(checkIns).toHaveLength(2);
    //expect(checkIns[0].gym_id).toBe('academia1');
    //expect(checkIns[1].gym_id).toBe('academia2');
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id: 'academia1'}),
      expect.objectContaining({gym_id: 'academia2'}),
    ]);

  });


  it('should be able to fetch paginated check-in history', async () => {

    for (let i = 1; i <= 22; i++){
      await checkInsRepository.create({
        user_id: '123',
        gym_id: `academia${i}`,
        validated_at: new Date(),
      });
    }


    const {checkIns } = await sut.execute({
      userId: '123',
      page:2
    });

    expect(checkIns).toHaveLength(2);
    //expect(checkIns[0].gym_id).toBe('academia1');
    //expect(checkIns[1].gym_id).toBe('academia2');
    expect(checkIns).toEqual([
      expect.objectContaining({gym_id: 'academia21'}),
      expect.objectContaining({gym_id: 'academia22'}),
    ]);

  });

});