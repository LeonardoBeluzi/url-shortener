import { CreateShortenedUrlDto } from '../dto/create-shortened-url.dto';
import ShortenedUrl from '../entities/shortened-url.entity';
import { Env } from '../../commons/environment/env';
import ShortUrlGenerator from '../useCase/short-url-generator';
import { IShortenedUrlRepository } from '../repository/shortened-url-repository.interface';
import { Inject } from '@nestjs/common';

export class CreateShortenedUrlService {
  constructor(
    @Inject('IShortenedUrlRepository')
    private shortenedUrlRepository: IShortenedUrlRepository,
    private readonly shortUrlGenerator: ShortUrlGenerator,
  ) {}
  async execute(
    input: CreateShortenedUrlDto,
    userId: number,
  ): Promise<ShortenedUrl> {
    const newShortenedUrl = await this.shortUrlGenerator.execute();

    const shortenedUrl = new ShortenedUrl({
      ...input,
      shortUrl: newShortenedUrl.shortUrl,
      userId,
    });

    const createdShortenedUrl =
      await this.shortenedUrlRepository.create(shortenedUrl);

    return new ShortenedUrl({
      ...createdShortenedUrl,
      shortUrl: `${Env.APPLICATION_HOST}/${createdShortenedUrl.shortUrl}`,
    });
  }
}
