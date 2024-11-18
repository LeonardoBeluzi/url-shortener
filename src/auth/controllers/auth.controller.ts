import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dto/auth.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ShowAuthDto } from '../dto/show-auth.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOkResponse({ type: ShowAuthDto })
  signIn(@Body() input: AuthDto) {
    return this.authService.signIn(input);
  }
}
