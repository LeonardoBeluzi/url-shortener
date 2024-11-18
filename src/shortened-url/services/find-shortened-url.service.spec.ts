import { Test, TestingModule } from '@nestjs/testing';
import { ShortenedUrlRepository } from '../repository/shortened-url.repository';
import { Url } from '../models/shortened-url.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigurationOptions } from '../../commons/database/database.config';
import ShortenedUrl from '../entities/shortened-url.entity';
import { FindShortenedUrlService } from './find-shortened-url.service';
import { NotFoundException } from '@nestjs/common';
import { User } from '../../user/models/user.model';

const SHORTENED_URL = new ShortenedUrl({
  longUrl: 'my-long-url',
  shortUrl: 'ABC123',
});

describe('FindShortenedUrlService', () => {
  let findShortenedUrlService: FindShortenedUrlService;
  let shortenedUrlRepository: ShortenedUrlRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfigurationOptions }),
        TypeOrmModule.forFeature([Url, User]),
      ],
      controllers: [],
      providers: [
        FindShortenedUrlService,
        {
          provide: 'IShortenedUrlRepository',
          useClass: ShortenedUrlRepository,
        },
      ],
    }).compile();

    findShortenedUrlService = app.get<FindShortenedUrlService>(
      FindShortenedUrlService,
    );

    shortenedUrlRepository = app.get<ShortenedUrlRepository>(
      'IShortenedUrlRepository',
    );
  });

  describe('root', () => {
    it('should get a short url', async () => {
      await shortenedUrlRepository.create(SHORTENED_URL);

      const shortenedUrl = await findShortenedUrlService.execute(
        SHORTENED_URL.shortUrl,
      );

      expect(shortenedUrl.id).toBeDefined();
      expect(shortenedUrl.longUrl).toBe(SHORTENED_URL.longUrl);
      expect(shortenedUrl.shortUrl).toBeDefined();
      expect(shortenedUrl.hits).toBe(0);
      expect(shortenedUrl.userId).toBeUndefined();
      expect(shortenedUrl.createdAt).toBeDefined();
      expect(shortenedUrl.updatedAt).toBeDefined();
      expect(shortenedUrl.deleteAt).toBeUndefined();
    });

    it('should throw an exception in case the short url does not exists', async () => {
      try {
        await findShortenedUrlService.execute(SHORTENED_URL.longUrl);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
