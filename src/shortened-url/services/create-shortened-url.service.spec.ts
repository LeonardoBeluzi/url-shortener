import { Test, TestingModule } from '@nestjs/testing';
import { ShortenedUrlRepository } from '../repository/shortened-url.repository';
import { Url } from '../models/shortened-url.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigurationOptions } from '../../commons/database/database.config';
import { CreateShortenedUrlService } from './create-shortened-url.service';
import ShortenedUrl from '../entities/shortened-url.entity';
import ShortUrlGenerator from '../useCase/short-url-generator';

const SHORTENED_URL = new ShortenedUrl({
  longUrl: 'my-long-url',
  shortUrl: 'ABC123',
});

describe('CreateShortenedUrlService', () => {
  let createShortenedUrlService: CreateShortenedUrlService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfigurationOptions }),
        TypeOrmModule.forFeature([Url]),
      ],
      controllers: [],
      providers: [
        CreateShortenedUrlService,
        ShortUrlGenerator,
        {
          provide: 'IShortenedUrlRepository',
          useClass: ShortenedUrlRepository,
        },
      ],
    }).compile();

    createShortenedUrlService = app.get<CreateShortenedUrlService>(
      CreateShortenedUrlService,
    );
  });

  describe('root', () => {
    it('should create a short url', async () => {
      const shortenedUrl =
        await createShortenedUrlService.execute(SHORTENED_URL);

      expect(shortenedUrl.id).toBeDefined();
      expect(shortenedUrl.longUrl).toBe(SHORTENED_URL.longUrl);
      expect(shortenedUrl.shortUrl).toBeDefined();
      expect(shortenedUrl.hits).toBe(0);
      expect(shortenedUrl.userId).toBeNull();
      expect(shortenedUrl.createdAt).toBeDefined();
      expect(shortenedUrl.updatedAt).toBeDefined();
      expect(shortenedUrl.deleteAt).toBeUndefined();
    });
  });
});
