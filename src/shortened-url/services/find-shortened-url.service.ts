import { Inject, NotFoundException } from '@nestjs/common';
import ShortenedUrl from '../entities/shortened-url.entity';
import { IShortenedUrlRepository } from '../repository/shortened-url-repository.interface';

export class FindShortenedUrlService {
  constructor(
    @Inject('IShortenedUrlRepository')
    private shortenedUrlRepository: IShortenedUrlRepository,
  ) {}
  async execute(input: string): Promise<ShortenedUrl> {
    const shortenedUrl = await this.shortenedUrlRepository.findOneByUrl(input);

    if (!shortenedUrl) {
      throw new NotFoundException();
    }

    await this.shortenedUrlRepository.updateHits(shortenedUrl.id);
    return shortenedUrl;
  }
}
