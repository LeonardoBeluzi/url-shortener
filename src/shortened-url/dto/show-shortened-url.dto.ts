import { ApiProperty } from '@nestjs/swagger';
import ShortenedUrl from '../entities/shortened-url.entity';

export class ShowShortenedUrlDto {
  @ApiProperty({
    example:
      'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
  })
  longUrl: string;

  @ApiProperty({
    example: 'http://localhost/aZbKq7',
  })
  shortUrl: string;

  constructor({ longUrl, shortUrl }: ShortenedUrl) {
    this.longUrl = longUrl;
    this.shortUrl = shortUrl;
  }
}
