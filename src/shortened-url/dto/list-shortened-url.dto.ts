import { ApiProperty } from '@nestjs/swagger';
import ShortenedUrl from '../entities/shortened-url.entity';

export class ListShortenedUrlDto {
  @ApiProperty({
    example:
      'https://teddy360.com.br/material/marco-legal-das-garantias-sancionado-entenda-o-que-muda/',
  })
  longUrl: string;

  @ApiProperty({
    example: 'http://localhost/aZbKq7',
  })
  shortUrl: string;

  @ApiProperty({
    example: 100,
  })
  hits: number;

  constructor({ longUrl, shortUrl, hits }: ShortenedUrl) {
    this.longUrl = longUrl;
    this.shortUrl = shortUrl;
    this.hits = hits;
  }
}
