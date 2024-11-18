import { Test, TestingModule } from '@nestjs/testing';
import { ShortenedUrlRepository } from '../repository/shortened-url.repository';
import { Url } from '../models/shortened-url.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfigurationOptions } from '../../commons/database/database.config';
import { FindShortenedUrlController } from './find-shortened-url.controller';
import { FindShortenedUrlService } from '../services/find-shortened-url.service';
import { NotFoundException } from '@nestjs/common';
import ShortenedUrl from '../entities/shortened-url.entity';
import { Response } from 'express';
import { mock, MockProxy } from 'jest-mock-extended';

const SHORTENED_URL = new ShortenedUrl({
  longUrl: 'my-long-url',
  shortUrl: 'ABC123',
});

describe('FindShortenedUrlController', () => {
  let findShortenedUrlController: FindShortenedUrlController;
  let shortenedUrlRepository: ShortenedUrlRepository;
  let mockedResponse: MockProxy<Response>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...databaseConfigurationOptions }),
        TypeOrmModule.forFeature([Url]),
      ],
      controllers: [FindShortenedUrlController],
      providers: [
        FindShortenedUrlService,
        {
          provide: 'IShortenedUrlRepository',
          useClass: ShortenedUrlRepository,
        },
      ],
    }).compile();

    findShortenedUrlController = app.get<FindShortenedUrlController>(
      FindShortenedUrlController,
    );

    shortenedUrlRepository = app.get<ShortenedUrlRepository>(
      'IShortenedUrlRepository',
    );

    mockedResponse = mock();
  });

  describe('root', () => {
    it('should throw a not found excepting if the url does not exists', async () => {
      try {
        await findShortenedUrlController.get(null, SHORTENED_URL.shortUrl);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('should redirect the user to the found url', async () => {
      await shortenedUrlRepository.create(SHORTENED_URL);

      const spy = jest.spyOn(mockedResponse, 'redirect');

      await findShortenedUrlController.get(
        mockedResponse,
        SHORTENED_URL.shortUrl,
      );

      expect(spy).toHaveBeenCalledWith(302, SHORTENED_URL.longUrl);
    });

    it('should update the hits counter', async () => {
      let createdShortenedUrl: ShortenedUrl;

      createdShortenedUrl = await shortenedUrlRepository.create(SHORTENED_URL);

      expect(createdShortenedUrl.hits).toBe(0);

      await findShortenedUrlController.get(
        mockedResponse,
        SHORTENED_URL.shortUrl,
      );

      createdShortenedUrl = await shortenedUrlRepository.findOneByUrl(
        SHORTENED_URL.shortUrl,
      );

      expect(createdShortenedUrl.hits).toBe(1);
    });
  });
});
