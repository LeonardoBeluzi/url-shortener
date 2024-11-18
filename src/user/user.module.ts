import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.model';
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUserService } from './services/create-user.service';
import { UserRepository } from './repository/user-repository';
import PasswordHash from './useCase/password-hash';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CreateUserController],
  providers: [
    CreateUserService,
    PasswordHash,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [],
})
export class UserModule {}
