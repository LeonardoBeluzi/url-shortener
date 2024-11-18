import { Module } from '@nestjs/common';
import { CreateShortenedUrlController } from './controllers/create-shortened-url.controller';
import { CreateShortenedUrlService } from './services/create-shortened-url.service';
import { ShortenedUrlRepository } from './repository/shortened-url.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './models/shortened-url.model';
import { FindShortenedUrlController } from './controllers/find-shortened-url.controller';
import { FindShortenedUrlService } from './services/find-shortened-url.service';
import ShortUrlGenerator from './useCase/short-url-generator';
import { User } from 'src/user/models/user.model';
import { DeleteShortenedUrlController } from './controllers/delete-shortened-url.controller';
import { DeleteShortenedUrlService } from './services/delete-shortened-url.service';
import { ListShortenedUrlController } from './controllers/list-shortened-url.controller';
import { ListShortenedUrlService } from './services/list-shortened-url.service';
import { UpdateShortenedUrlController } from './controllers/update-shortened-url.controller';
import { UpdateShortenedUrlService } from './services/update-shortened-url.service';

@Module({
  imports: [TypeOrmModule.forFeature([Url, User])],
  controllers: [
    CreateShortenedUrlController,
    FindShortenedUrlController,
    DeleteShortenedUrlController,
    ListShortenedUrlController,
    UpdateShortenedUrlController,
  ],
  providers: [
    CreateShortenedUrlService,
    FindShortenedUrlService,
    DeleteShortenedUrlService,
    ListShortenedUrlService,
    UpdateShortenedUrlService,
    ShortUrlGenerator,
    {
      provide: 'IShortenedUrlRepository',
      useClass: ShortenedUrlRepository,
    },
  ],
  exports: [],
})
export class UrlShortenerModule {}
