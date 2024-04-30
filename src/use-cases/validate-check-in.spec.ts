import { expect, describe,it, beforeEach, vi} from 'vitest'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { validateCheckInUseCase } from './validate-check-inUseCase';
import { after } from 'node:test';
import { LateCheckInValidationError } from './errors/late-check-in-validartion-error';

let checkInRepository: inMemoryCheckInsRepository;
let sut: validateCheckInUseCase;

describe('Validate check in Use Case', () => {
  beforeEach(()=>{
    checkInRepository = new inMemoryCheckInsRepository();
    sut = new validateCheckInUseCase(checkInRepository);
    vi.useFakeTimers();
  })

  after(()=>{
    vi.useRealTimers();
  })


  it('should be able to validate check in', async () => {

      const chechin1 = await checkInRepository.create({
        user_id: '1',
        gym_id: '1',
        createdAt: new Date(),
      });

      const chechin2 =  await checkInRepository.create({
        user_id: '1',
        gym_id: '1',
        createdAt: new Date(),
      });


    const {checkInId} = await sut.execute({ checkInId: chechin1.id });

    expect(checkInId.validated_at).toEqual(expect.any(Date));
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date));
    expect(checkInRepository.items[1].validated_at).not.toEqual(expect.any(Date));
  });

  it('should no be ', async () => {
    await expect(sut.execute({ checkInId: 'not-exists'})).rejects.toThrowError('Resource not found');
  });

  it('should not be able to validate tje check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 10, 13, 40));

    const checkIn = await checkInRepository.create({
      user_id: '1',
      gym_id: '1',
      createdAt: new Date(),
    });

    vi.advanceTimersByTime(1000 * 60 * 21);

    await expect(sut.execute({ checkInId: checkIn.id })).rejects.toBeInstanceOf(LateCheckInValidationError);
  });

});