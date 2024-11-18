import { Test, TestingModule } from '@nestjs/testing';
import { CreateShortenedUrlController } from './create-shortened-url.controller';
import { CreateShortenedUrlService } from '../services/create-shortened-url.service';
import { ShortenedUrlRepository } from '../repository/shortened-url.repository';
import { Url } from '../models/shortened-url.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigurationOptions } from '../../commons/database/database.config';
import ShortUrlGenerator from '../useCase/short-url-generator';

describe('CreateShortenedUrlController', () => {
  let createShortenedUrlController: CreateShortenedUrlController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfigurationOptions }),
        TypeOrmModule.forFeature([Url]),
      ],
      controllers: [CreateShortenedUrlController],
      providers: [
        CreateShortenedUrlService,
        ShortUrlGenerator,
        {
          provide: 'IShortenedUrlRepository',
          useClass: ShortenedUrlRepository,
        },
      ],
    }).compile();

    createShortenedUrlController = app.get<CreateShortenedUrlController>(
      CreateShortenedUrlController,
    );
  });

  describe('root', () => {
    it('should return a valid shortened url', async () => {
      const longUrl = '123';
      const createdUrl = await createShortenedUrlController.create({ longUrl });

      expect(createdUrl.longUrl).toBe(longUrl);
      expect(createdUrl.shortUrl).toBeDefined();
    });
  });
});
