import { Test, TestingModule } from '@nestjs/testing';
import { ShortenedUrlRepository } from '../repository/shortened-url.repository';
import { Url } from '../models/shortened-url.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigurationOptions } from '../../commons/database/database.config';
import ShortenedUrl from '../entities/shortened-url.entity';
import { User as UserModel } from '../../user/models/user.model';
import { UserRepository } from '../../user/repository/user-repository';
import User from '../../user/entities/user.entity';
import { UpdateShortenedUrlService } from './update-shortened-url.service';
import { NotFoundException } from '@nestjs/common';

const SHORTENED_URL = new ShortenedUrl({
  longUrl: 'my-long-url',
  shortUrl: 'ABC123',
});

const USER = new User({
  email: 'my-email@email.com',
  password: 'ABC123',
});

describe('UpdateShortenedUrlService', () => {
  let updateShortenedUrlService: UpdateShortenedUrlService;
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
        UpdateShortenedUrlService,
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

    updateShortenedUrlService = app.get<UpdateShortenedUrlService>(
      UpdateShortenedUrlService,
    );

    userRepository = app.get<UserRepository>('IUserRepository');
    shortenedUrlRepository = app.get<ShortenedUrlRepository>(
      'IShortenedUrlRepository',
    );
  });

  describe('root', () => {
    it('should update an existing short url', async () => {
      const newLongUrl = 'http://google.com';
      const user = await userRepository.create(USER);

      await shortenedUrlRepository.create({
        ...SHORTENED_URL,
        userId: user.id,
      });

      const updatedUrl = await updateShortenedUrlService.execute(
        SHORTENED_URL.shortUrl,
        { longUrl: newLongUrl },
        user.id,
      );

      expect(updatedUrl.longUrl).toBe(newLongUrl);
    });

    it('should raise a not found exception if the short url does not exists', async () => {
      const newLongUrl = 'http://google.com';
      const user = await userRepository.create(USER);

      await shortenedUrlRepository.create({
        ...SHORTENED_URL,
        userId: user.id,
      });

      try {
        await updateShortenedUrlService.execute(
          '1234',
          { longUrl: newLongUrl },
          user.id,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
