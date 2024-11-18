import { Test, TestingModule } from '@nestjs/testing';
import { ShortenedUrlRepository } from '../repository/shortened-url.repository';
import { Url } from '../models/shortened-url.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigurationOptions } from '../../commons/database/database.config';
import ShortenedUrl from '../entities/shortened-url.entity';
import ShortUrlGenerator from '../useCase/short-url-generator';
import { User as UserModel } from '../../user/models/user.model';
import { UserRepository } from '../../user/repository/user-repository';
import User from '../../user/entities/user.entity';
import { DeleteShortenedUrlService } from './delete-shortened-url.service';

const SHORTENED_URL = new ShortenedUrl({
  longUrl: 'my-long-url',
  shortUrl: 'ABC123',
});

const USER = new User({
  email: 'my-email@email.com',
  password: 'ABC123',
});

describe('DeleteShortenedUrlService', () => {
  let deleteShortenedUrlService: DeleteShortenedUrlService;
  let userRepository: UserRepository;
  let shortenedUrlRepository: ShortenedUrlRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfigurationOptions }),
        TypeOrmModule.forFeature([Url, UserModel]),
      ],
      controllers: [],
      providers: [
        DeleteShortenedUrlService,
        ShortUrlGenerator,
        {
          provide: 'IShortenedUrlRepository',
          useClass: ShortenedUrlRepository,
        },
        {
          provide: 'IUserRepository',
          useClass: UserRepository,
        },
      ],
    }).compile();

    deleteShortenedUrlService = app.get<DeleteShortenedUrlService>(
      DeleteShortenedUrlService,
    );

    userRepository = app.get<UserRepository>('IUserRepository');
    shortenedUrlRepository = app.get<ShortenedUrlRepository>(
      'IShortenedUrlRepository',
    );
  });

  describe('root', () => {
    it('should delete an existing short url', async () => {
      let foundUrl: ShortenedUrl;
      const user = await userRepository.create(USER);

      await shortenedUrlRepository.create({
        ...SHORTENED_URL,
        userId: user.id,
      });

      foundUrl = await shortenedUrlRepository.findOneByUrl(
        SHORTENED_URL.shortUrl,
      );

      expect(foundUrl).not.toBeNull();

      await deleteShortenedUrlService.execute(SHORTENED_URL.shortUrl, user.id);

      foundUrl = await shortenedUrlRepository.findOneByUrl(
        SHORTENED_URL.shortUrl,
      );

      expect(foundUrl).toBeNull();
    });

    it('should not delete an short url from another user', async () => {
      let foundUrl: ShortenedUrl;
      const user1 = await userRepository.create(USER);
      const user2 = await userRepository.create({
        ...USER,
        email: 'my-email2@email.com',
      });

      await shortenedUrlRepository.create({
        ...SHORTENED_URL,
        userId: user1.id,
      });

      foundUrl = await shortenedUrlRepository.findOneByUrl(
        SHORTENED_URL.shortUrl,
      );

      expect(foundUrl).not.toBeNull();

      await deleteShortenedUrlService.execute(SHORTENED_URL.shortUrl, user2.id);

      foundUrl = await shortenedUrlRepository.findOneByUrl(
        SHORTENED_URL.shortUrl,
      );

      expect(foundUrl).not.toBeNull();
    });
  });
});
