import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../../user/repository/user-repository.interface';
import PasswordHash from '../../user/useCase/password-hash';
import { AuthDto } from '../dto/auth.dto';
import { Env } from '../../commons/environment/env';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepository')
    private userRepository: IUserRepository,
    private passwordHash: PasswordHash,
    private jwtService: JwtService,
  ) {}

  async signIn(input: AuthDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOneByEmail(input.email);

    if (!user) {
      throw new BadRequestException();
    }

    const isMatch = await this.passwordHash.compare(
      input.password,
      user.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const access_token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: Env.JWT_SECRET,
        expiresIn: '1 day',
      },
    );

    return { access_token };
  }
}
