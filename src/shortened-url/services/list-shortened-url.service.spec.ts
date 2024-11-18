import { Test, TestingModule } from '@nestjs/testing';
import { ShortenedUrlRepository } from '../repository/shortened-url.repository';
import { Url } from '../models/shortened-url.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigurationOptions } from '../../commons/database/database.config';
import ShortenedUrl from '../entities/shortened-url.entity';
import { User as UserModel } from '../../user/models/user.model';
import { UserRepository } from '../../user/repository/user-repository';
import User from '../../user/entities/user.entity';
import { ListShortenedUrlService } from './list-shortened-url.service';

const SHORTENED_URL = new ShortenedUrl({
  longUrl: 'my-long-url',
  shortUrl: 'ABC123',
});

const USER = new User({
  email: 'my-email@email.com',
  password: 'ABC123',
});

describe('ListShortenedUrlService', () => {
  let listShortenedUrlService: ListShortenedUrlService;
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
        ListShortenedUrlService,
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

    listShortenedUrlService = app.get<ListShortenedUrlService>(
      ListShortenedUrlService,
    );

    userRepository = app.get<UserRepository>('IUserRepository');
    shortenedUrlRepository = app.get<ShortenedUrlRepository>(
      'IShortenedUrlRepository',
    );
  });

  describe('root', () => {
    it('should list all existing short urls', async () => {
      const user = await userRepository.create(USER);

      await shortenedUrlRepository.create({
        ...SHORTENED_URL,
        userId: user.id,
      });

      const foundUrls = await listShortenedUrlService.execute(user.id);

      expect(foundUrls).toHaveLength(1);
    });

    it('should not list short urls from another user', async () => {
      const user1 = await userRepository.create(USER);
      const user2 = await userRepository.create({
        ...USER,
        email: 'my-email2@email.com',
      });

      await shortenedUrlRepository.create({
        ...SHORTENED_URL,
        userId: user1.id,
      });

      const foundUrls = await listShortenedUrlService.execute(user2.id);

      expect(foundUrls).toHaveLength(0);
    });
  });
});
