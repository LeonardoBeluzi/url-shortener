import { CreateUserDto } from '../dto/create-user.dto';
import User from '../entities/user.entity';

export interface IUserRepository {
  create(user: CreateUserDto): Promise<User>;
  findOneByEmail(email: string): Promise<User | null>;
}
