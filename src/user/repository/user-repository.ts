import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from './user-repository.interface';
import { User as UserModel } from '../models/user.model';
import { CreateUserDto } from '../dto/create-user.dto';
import User from '../entities/user.entity';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserModel)
    private userRepository: Repository<UserModel>,
  ) {}
  async create(user: CreateUserDto): Promise<User> {
    const userEntity = this.userRepository.create(user);
    const newUser = await this.userRepository.save(userEntity);
    return new User(newUser);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const foundUser = await this.userRepository.findOneBy({
      email,
    });

    if (!foundUser) {
      return null;
    }

    return new User(foundUser);
  }
}
