import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateShortenedUrlDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Long Url',
    example:
      'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
  })
  @IsString({
    message: 'longUrl must be a string',
  })
  @IsNotEmpty({
    message: 'longUrl must not be empty',
  })
  @IsUrl(
    {},
    {
      message: 'longUrl must be a valid url',
    },
  )
  longUrl: string;
}
