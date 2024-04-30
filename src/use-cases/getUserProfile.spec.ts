import { expect, describe,it, beforeEach} from 'vitest'
import { hash } from 'bcryptjs';
import { inMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { GetUserProfileUseCase } from './getUserProfileUseCase';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let userRepository: inMemoryRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {

  beforeEach(()=>{
    userRepository = new inMemoryRepository();
    sut = new GetUserProfileUseCase(userRepository);
  });

  it('should be able to get user profile', async () => {

  
    const createdUser = await userRepository.create(
      {
        name: 'John Doe',
        email: 'john@john.com',
        password_hash: await hash('123456', 6),

      }
    );

    const {user} =  await sut.execute({
        userId: createdUser.id
    });

    // expect(user.id).toEqual(expect.any(String));

    expect(user.name).toEqual('John Doe');

    
  });

  it('should not be able to get user profile with wrong id', async () => {

    expect(() => sut.execute({
      userId:'wrong-id'
    })).rejects.toBeInstanceOf(ResourceNotFoundError);

  });

});