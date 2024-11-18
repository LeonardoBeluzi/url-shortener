import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigurationOptions } from '../../commons/database/database.config';
import { CreateUserController } from './create-user.controller';
import { UserRepository } from '../repository/user-repository';
import { CreateUserService } from '../services/create-user.service';
import { User as UserModel } from '../models/user.model';
import User from '../entities/user.entity';
import PasswordHash from '../useCase/password-hash';

const USER = new User({
  email: 'my-email@email.com',
  password: 'ABC123',
});

describe('CreateUserController', () => {
  let createUserController: CreateUserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfigurationOptions }),
        TypeOrmModule.forFeature([UserModel]),
      ],
      controllers: [CreateUserController],
      providers: [
        CreateUserService,
        PasswordHash,
        {
          provide: 'IUserRepository',
          useClass: UserRepository,
        },
      ],
    }).compile();

    createUserController = app.get<CreateUserController>(CreateUserController);
  });

  describe('root', () => {
    it('should not throw an exception when creating a new user', async () => {
      expect(await createUserController.create(USER)).toBeUndefined();
    });
  });
});
