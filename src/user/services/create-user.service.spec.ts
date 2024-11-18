import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigurationOptions } from '../../commons/database/database.config';
import { CreateUserService } from './create-user.service';
import { User as UserModel } from '../models/user.model';
import User from '../entities/user.entity';
import { UserRepository } from '../repository/user-repository';
import { BadRequestException } from '@nestjs/common';
import PasswordHash from '../useCase/password-hash';

const USER = new User({
  email: 'my-email@email.com',
  password: 'ABC123',
});

describe('CreateUserService', () => {
  let createUserService: CreateUserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfigurationOptions }),
        TypeOrmModule.forFeature([UserModel]),
      ],
      controllers: [],
      providers: [
        CreateUserService,
        PasswordHash,
        {
          provide: 'IUserRepository',
          useClass: UserRepository,
        },
      ],
    }).compile();

    createUserService = app.get<CreateUserService>(CreateUserService);
    userRepository = app.get<UserRepository>('IUserRepository');
  });

  describe('root', () => {
    it('should create a user', async () => {
      const newUser = await createUserService.execute(USER);

      expect(newUser.id).toBeDefined();
      expect(newUser.email).toBe(USER.email);
      expect(newUser.password).not.toBe(USER.password);
      expect(newUser.createdAt).toBeDefined();
      expect(newUser.updatedAt).toBeDefined();
      expect(newUser.deleteAt).toBeUndefined();
    });

    it('should throw an excepting if the user already exists', async () => {
      await userRepository.create(USER);

      try {
        await createUserService.execute(USER);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
