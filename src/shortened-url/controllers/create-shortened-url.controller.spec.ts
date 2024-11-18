import { Test, TestingModule } from '@nestjs/testing';
import { CreateShortenedUrlController } from './create-shortened-url.controller';
import { CreateShortenedUrlService } from '../services/create-shortened-url.service';
import { ShortenedUrlRepository } from '../repository/shortened-url.repository';
import { Url } from '../models/shortened-url.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigurationOptions } from '../../commons/database/database.config';
import ShortUrlGenerator from '../useCase/short-url-generator';
import { User } from '../../user/models/user.model';
import { Request } from 'express';
import { mock, MockProxy } from 'jest-mock-extended';
import ShortenedUrl from '../entities/shortened-url.entity';
import { JwtService } from '@nestjs/jwt';

const SHORTENED_URL = new ShortenedUrl({
  longUrl: 'my-long-url',
  shortUrl: 'ABC123',
});

describe('CreateShortenedUrlController', () => {
  let createShortenedUrlController: CreateShortenedUrlController;
  let mockedRequest: MockProxy<Request>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfigurationOptions }),
        TypeOrmModule.forFeature([Url, User]),
      ],
      controllers: [CreateShortenedUrlController],
      providers: [
        CreateShortenedUrlService,
        ShortUrlGenerator,
        JwtService,
        {
          provide: 'IShortenedUrlRepository',
          useClass: ShortenedUrlRepository,
        },
      ],
    }).compile();

    createShortenedUrlController = app.get<CreateShortenedUrlController>(
      CreateShortenedUrlController,
    );

    mockedRequest = mock();
  });

  describe('root', () => {
    it('should return a valid shortened url', async () => {
      const createdUrl = await createShortenedUrlController.create(
        mockedRequest,
        SHORTENED_URL,
      );

      expect(createdUrl.longUrl).toBe(SHORTENED_URL.longUrl);
      expect(createdUrl.shortUrl).toBeDefined();
    });
  });
});
