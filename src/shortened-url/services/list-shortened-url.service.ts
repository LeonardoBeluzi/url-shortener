import { Env } from '../../commons/environment/env';
import ShortenedUrl from '../entities/shortened-url.entity';
import { IShortenedUrlRepository } from '../repository/shortened-url-repository.interface';
import { Inject } from '@nestjs/common';

export class ListShortenedUrlService {
  constructor(
    @Inject('IShortenedUrlRepository')
    private shortenedUrlRepository: IShortenedUrlRepository,
  ) {}
  async execute(userId: number): Promise<ShortenedUrl[]> {
    const shortenedUrls = await this.shortenedUrlRepository.list(userId);

    return shortenedUrls.map(
      (shortenedUrl) =>
        new ShortenedUrl({
          ...shortenedUrl,
          shortUrl: `${Env.APPLICATION_HOST}/${shortenedUrl.shortUrl}`,
        }),
    );
  }
}
