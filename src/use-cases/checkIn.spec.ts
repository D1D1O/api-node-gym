import { expect, test, describe,it, beforeAll, beforeEach, vi, afterEach} from 'vitest'
import { inMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { inMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CheckInUseCase } from './checkinUseCase';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';

let checkInsRepository: inMemoryCheckInsRepository;
let gymsRepository: inMemoryGymsRepository;
let sut: CheckInUseCase;

describe('Check-in Use Case', () => {
  beforeEach(async ()=>{
    checkInsRepository = new inMemoryCheckInsRepository();
    gymsRepository = new inMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository,gymsRepository);

    await gymsRepository.create({
      id: '123123',
      title: 'Academia',
      description: 'Academia Teste',
      photo: '/photo.jpg',
      latitude: -3.0948729,
      longitude: -60.0375103,
      phone: '9292929292'
    });


    vi.useFakeTimers();
  });

  afterEach(()=>{
    vi.useRealTimers();
  });

  it('should be able to create checkIn', async () => {


    const {checkIn} = await sut.execute({
      userId: '123',
      gymId: '123123',
      userLatitude: -3.0948729,
      userLongitude: -60.0375103,
    });

    expect(checkIn.id).toEqual(expect.any(String));

  });

  it('should not be able to check in twice in the some day', async () => {

    vi.setSystemTime(new Date(2022,0,20,8,0,0));

    await sut.execute({
      userId: '123',
      gymId: '123123',
      userLatitude: -3.0948729,
      userLongitude: -60.0375103,
    });

    await expect(()=> sut.execute({
      userId: '123',
      gymId: '123123',
      userLatitude: -3.0948729,
      userLongitude: -60.0375103,
    })).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);



  });

  it('should be able to check in twice but in different days', async () => {

    vi.setSystemTime(new Date(2022,0,20,8,0,0));

    await sut.execute({
      userId: '123',
      gymId: '123123',
      userLatitude: -3.0948729,
      userLongitude: -60.0375103,
    });

    vi.setSystemTime(new Date(2022,0,21,8,0,0));

    const {checkIn} = await sut.execute({
      userId: '123',
      gymId: '123123',
      userLatitude: -3.0948729,
      userLongitude: -60.0375103,
    });

    expect(checkIn.id).toEqual(expect.any(String));

  });

  it('should not be able to check in on distant gym', async () => {


    await gymsRepository.items.push({	
      id: 'gym-02',
      title: 'Academia Teste',
      description: 'Academia Teste',
      photo: '9292929292',
      latitude: new Decimal(-3.0290004),
      longitude: new Decimal(-59.9130428),
      phone:'9292929292',
    });


    await expect(()=> sut.execute({
      userId: '123',
      gymId: 'gym-02',
      userLatitude: -3.0948729,
      userLongitude: -60.0375103,
    })).rejects.toBeInstanceOf(MaxDistanceError);


  });

});