import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class AuthDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'email',
    example: 'my-email@email.com',
  })
  @IsString({
    message: 'email must be a string',
  })
  @IsNotEmpty({
    message: 'email must not be empty',
  })
  @IsEmail(
    {},
    {
      message: 'email must be a valid email',
    },
  )
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'password',
    example: '@Bcde12345',
  })
  @IsString({
    message: 'password must be a string',
  })
  @IsNotEmpty({
    message: 'password must not be empty',
  })
  @IsStrongPassword(
    {
      minLength: 10,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
      minLowercase: 1,
    },
    {
      message:
        'password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, 1 symbol and be 10 characters long',
    },
  )
  password: string;
}
