import { Inject } from '@nestjs/common';
import { IShortenedUrlRepository } from '../repository/shortened-url-repository.interface';
import ShortenedUrl from '../entities/shortened-url.entity';

export default class ShortUrlGenerator {
  constructor(
    @Inject('IShortenedUrlRepository')
    private shortenedUrlRepository: IShortenedUrlRepository,
  ) {}

  async execute(length: number = 6): Promise<Output> {
    let urlExists: ShortenedUrl = null;
    let newShortenedUrl: string = '';

    do {
      newShortenedUrl = this.generateUrl(length);
      urlExists =
        await this.shortenedUrlRepository.findOneByUrl(newShortenedUrl);
    } while (urlExists);

    return { shortUrl: newShortenedUrl };
  }

  private generateUrl(length: number): string {
    const CHARACTERS =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let shortUrl = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
      shortUrl += CHARACTERS[randomIndex];
    }

    return shortUrl;
  }
}

type Output = {
  shortUrl: string;
};
