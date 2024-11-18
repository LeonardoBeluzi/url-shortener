import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserRepository } from 'src/user/repository/user-repository';
import PasswordHash from 'src/user/useCase/password-hash';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/models/user.model';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    PasswordHash,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
