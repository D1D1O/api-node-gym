import { expect, describe,it, beforeEach} from 'vitest'
import { hash } from 'bcryptjs';
import { inMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticateUseCase';
import { InvalidCredentialsError } from './errors/invalid-credentials-errors';

let userRepository: inMemoryRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {

  beforeEach(()=>{
    userRepository = new inMemoryRepository();
    sut = new AuthenticateUseCase(userRepository);
  });

  it('should be able to authenticate', async () => {

  
    await userRepository.create(
      {
        name: 'John Doe',
        email: 'john@john.com',
        password_hash: await hash('123456', 6),

      }
    );

    const {user} =  await sut.execute({
      email: 'john@john.com',
      password: '123456'
    });


    expect(user.id).toEqual(expect.any(String));

  });

  it('should not be able to authenticate with wrong email', async () => {

    await expect(() => sut.execute({
      email: 'john@john.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError);

  });

  it('should not be able to authenticate with wrong password', async () => {

    await userRepository.create(
      {
        name: 'John Doe',
        email: 'john@john.com',
        password_hash: await hash('123456', 6),

      }
    );

    await expect(() => sut.execute({
      email: 'john@john.com',
      password: '123456123'
    })).rejects.toBeInstanceOf(InvalidCredentialsError);

  });

});