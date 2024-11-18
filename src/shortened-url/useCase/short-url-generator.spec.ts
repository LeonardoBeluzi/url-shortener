import { Test, TestingModule } from '@nestjs/testing';
import { ShortenedUrlRepository } from '../repository/shortened-url.repository';
import { Url } from '../models/shortened-url.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigurationOptions } from '../../commons/database/database.config';
import ShortUrlGenerator from '../useCase/short-url-generator';
import ShortenedUrl from '../entities/shortened-url.entity';
import { User } from '../../user/models/user.model';

const SHORTENED_URL = new ShortenedUrl({
  longUrl: 'my-long-url',
  shortUrl: 'ABC123',
});

describe('ShortUrlGenerator', () => {
  let shortUrlGenerator: ShortUrlGenerator;
  let shortenedUrlRepository: ShortenedUrlRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfigurationOptions }),
        TypeOrmModule.forFeature([Url, User]),
      ],
      controllers: [],
      providers: [
        ShortUrlGenerator,
        {
          provide: 'IShortenedUrlRepository',
          useClass: ShortenedUrlRepository,
        },
      ],
    }).compile();

    shortUrlGenerator = app.get<ShortUrlGenerator>(ShortUrlGenerator);
    shortenedUrlRepository = app.get<ShortenedUrlRepository>(
      'IShortenedUrlRepository',
    );
  });

  describe('root', () => {
    it('should create a short url with the correct length', async () => {
      const output = await shortUrlGenerator.execute(6);

      expect(output.shortUrl).toBeDefined();
      expect(output.shortUrl).toHaveLength(6);
    });

    it('should create a new short url if it already exists', async () => {
      const spy = jest
        .spyOn(ShortUrlGenerator.prototype as any, 'generateUrl')
        .mockImplementationOnce(() => {
          return SHORTENED_URL.shortUrl;
        });

      await shortenedUrlRepository.create(SHORTENED_URL);

      const output = await shortUrlGenerator.execute();

      expect(spy).toHaveBeenCalledTimes(2);

      expect(output.shortUrl).toBeDefined();
      expect(output.shortUrl).not.toBe(SHORTENED_URL.shortUrl);
    });
  });
});
