import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigurationOptions } from '../../commons/database/database.config';
import { AuthController } from './auth.controller';
import { User as UserModel } from '../../user/models/user.model';
import User from '../../user/entities/user.entity';
import { AuthService } from '../services/auth.service';
import PasswordHash from '../../user/useCase/password-hash';
import { UserRepository } from '../../user/repository/user-repository';
import { JwtModule, JwtService } from '@nestjs/jwt';

const USER = new User({
  email: 'my-email@email.com',
  password: 'ABC123',
});

const HASHED_PASSWORD =
  '$2b$10$BYl.sL.ANyotP0iAjdzj9uie.M/p5UQ.qNhhraTpTvpkgS9O4USeC';

describe('AuthController', () => {
  let authController: AuthController;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfigurationOptions }),
        TypeOrmModule.forFeature([UserModel]),
        JwtModule.register({
          global: true,
        }),
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        PasswordHash,
        JwtService,
        {
          provide: 'IUserRepository',
          useClass: UserRepository,
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    userRepository = app.get<UserRepository>('IUserRepository');
  });

  describe('root', () => {
    it('should not throw an exception when creating a new user', async () => {
      await userRepository.create({ ...USER, password: HASHED_PASSWORD });

      const token = await authController.signIn(USER);

      expect(token.access_token).toBeDefined();
    });
  });
});
