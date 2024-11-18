import { BadRequestException, Inject } from '@nestjs/common';
import { IUserRepository } from '../repository/user-repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import User from '../entities/user.entity';
import PasswordHash from '../useCase/password-hash';

export class CreateUserService {
  constructor(
    @Inject('IUserRepository')
    private userRepository: IUserRepository,
    private passwordHash: PasswordHash,
  ) {}
  async execute(input: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneByEmail(input.email);

    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await this.passwordHash.hash(input.password);

    const newUser = await this.userRepository.create({
      ...input,
      password: hashedPassword,
    });

    return newUser;
  }
}
