import { Test, TestingModule } from '@nestjs/testing';
import { ShortenedUrlRepository } from '../repository/shortened-url.repository';
import { Url } from '../models/shortened-url.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigurationOptions } from '../../commons/database/database.config';
import { CreateShortenedUrlService } from './create-shortened-url.service';
import ShortenedUrl from '../entities/shortened-url.entity';
import ShortUrlGenerator from '../useCase/short-url-generator';
import { User as UserModel } from '../../user/models/user.model';
import { UserRepository } from '../../user/repository/user-repository';
import User from '../../user/entities/user.entity';

const SHORTENED_URL = new ShortenedUrl({
  longUrl: 'my-long-url',
  shortUrl: 'ABC123',
});

const USER = new User({
  email: 'my-email@email.com',
  password: 'ABC123',
});

describe('CreateShortenedUrlService', () => {
  let createShortenedUrlService: CreateShortenedUrlService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfigurationOptions }),
        TypeOrmModule.forFeature([Url, UserModel]),
      ],
      controllers: [],
      providers: [
        CreateShortenedUrlService,
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

    createShortenedUrlService = app.get<CreateShortenedUrlService>(
      CreateShortenedUrlService,
    );

    userRepository = app.get<UserRepository>('IUserRepository');
  });

  describe('root', () => {
    it('should create a short url', async () => {
      const shortenedUrl = await createShortenedUrlService.execute(
        SHORTENED_URL,
        null,
      );

      expect(shortenedUrl.id).toBeDefined();
      expect(shortenedUrl.longUrl).toBe(SHORTENED_URL.longUrl);
      expect(shortenedUrl.shortUrl).toBeDefined();
      expect(shortenedUrl.hits).toBe(0);
      expect(shortenedUrl.userId).toBeNull();
      expect(shortenedUrl.createdAt).toBeDefined();
      expect(shortenedUrl.updatedAt).toBeDefined();
      expect(shortenedUrl.deleteAt).toBeUndefined();
    });

    it('should create a short url to a user', async () => {
      const user = await userRepository.create(USER);
      const shortenedUrl = await createShortenedUrlService.execute(
        SHORTENED_URL,
        user.id,
      );

      expect(shortenedUrl.id).toBeDefined();
      expect(shortenedUrl.longUrl).toBe(SHORTENED_URL.longUrl);
      expect(shortenedUrl.shortUrl).toBeDefined();
      expect(shortenedUrl.hits).toBe(0);
      expect(shortenedUrl.userId).toBe(user.id);
      expect(shortenedUrl.createdAt).toBeDefined();
      expect(shortenedUrl.updatedAt).toBeDefined();
      expect(shortenedUrl.deleteAt).toBeUndefined();
    });
  });
});
