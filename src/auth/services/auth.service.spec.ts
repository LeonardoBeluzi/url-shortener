import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigurationOptions } from '../../commons/database/database.config';
import { User as UserModel } from '../../user/models/user.model';
import User from '../../user/entities/user.entity';
import { AuthService } from './auth.service';
import { UserRepository } from '../../user/repository/user-repository';
import PasswordHash from '../../user/useCase/password-hash';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

const USER = new User({
  email: 'my-email@email.com',
  password: 'ABC123',
});

const HASHED_PASSWORD =
  '$2b$10$BYl.sL.ANyotP0iAjdzj9uie.M/p5UQ.qNhhraTpTvpkgS9O4USeC';

describe('AuthService', () => {
  let authService: AuthService;
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
      controllers: [],
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

    authService = app.get<AuthService>(AuthService);
    userRepository = app.get<UserRepository>('IUserRepository');
  });

  describe('root', () => {
    it('should authenticate if the user exists', async () => {
      await userRepository.create({ ...USER, password: HASHED_PASSWORD });
      const token = await authService.signIn(USER);

      expect(token.access_token).toBeDefined();
    });

    it('should return a bad request exception if the user does not exists', async () => {
      try {
        await authService.signIn(USER);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('should return an unauthorized exception if the password does not match', async () => {
      await userRepository.create(USER);

      try {
        await authService.signIn(USER);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
      }
    });
  });
});
