import { expect, test, describe,it, beforeAll, beforeEach} from 'vitest'
import { RegisterUseCAse } from './registerUseCase';
import { compare } from 'bcryptjs';
import { inMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let userRepository: inMemoryRepository;
let sut: RegisterUseCAse;

describe('Register Use Case', () => {
  beforeEach(()=>{
    userRepository = new inMemoryRepository();
    sut = new RegisterUseCAse(userRepository);
  })

  it('should be able to register', async () => {

    const {user} =  await sut.execute({
      name: 'John Doe',
      email: 'John@john.com',
      password: '123456'
    });


    expect(user.id).toEqual(expect.any(String));

  });

  it('should hash user password upon registration', async () => {


    const {user} =  await sut.execute({
      name: 'John Doe',
      email: 'John@john.com',
      password: '123456'
    });

    const isPasswordHashed = await compare('123456', user.password_hash);

    expect(isPasswordHashed).toBe(true);

  });

  it('should not be able to register with same email twice', async () => {


    const email = 'John@john.com';

    const result = await sut.execute({
      name: 'John Doe',
      email: email,
      password: '123456'
    });

    await expect(()=> sut.execute({
      name: 'John Doe',
      email: email,
      password: '123456'
    })).rejects.toBeInstanceOf(UserAlreadyExistsError);

  });

});