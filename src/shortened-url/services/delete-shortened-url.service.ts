import { IShortenedUrlRepository } from '../repository/shortened-url-repository.interface';
import { Inject } from '@nestjs/common';

export class DeleteShortenedUrlService {
  constructor(
    @Inject('IShortenedUrlRepository')
    private shortenedUrlRepository: IShortenedUrlRepository,
  ) {}
  async execute(shortUrl: string, userId: number): Promise<void> {
    return await this.shortenedUrlRepository.delete(shortUrl, userId);
  }
}
