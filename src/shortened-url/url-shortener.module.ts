import { Module } from '@nestjs/common';
import { CreateShortenedUrlController } from './controllers/create-shortened-url.controller';
import { CreateShortenedUrlService } from './services/create-shortened-url.service';
import { ShortenedUrlRepository } from './repository/shortened-url.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './models/shortened-url.model';
import { FindShortenedUrlController } from './controllers/find-shortened-url.controller';
import { FindShortenedUrlService } from './services/find-shortened-url.service';
import ShortUrlGenerator from './useCase/short-url-generator';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [CreateShortenedUrlController, FindShortenedUrlController],
  providers: [
    CreateShortenedUrlService,
    FindShortenedUrlService,
    ShortUrlGenerator,
    {
      provide: 'IShortenedUrlRepository',
      useClass: ShortenedUrlRepository,
    },
  ],
  exports: [],
})
export class UrlShortenerModule {}
