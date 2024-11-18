import ShortenedUrl from '../entities/shortened-url.entity';
import { Env } from '../../commons/environment/env';
import { IShortenedUrlRepository } from '../repository/shortened-url-repository.interface';
import { Inject, NotFoundException } from '@nestjs/common';
import { UpdateShortenedUrlDto } from '../dto/update-shortened-url.dto';

export class UpdateShortenedUrlService {
  constructor(
    @Inject('IShortenedUrlRepository')
    private shortenedUrlRepository: IShortenedUrlRepository,
  ) {}
  async execute(
    url: string,
    input: UpdateShortenedUrlDto,
    userId: number,
  ): Promise<ShortenedUrl> {
    const updatedShortenedUrl = await this.shortenedUrlRepository.update(
      url,
      userId,
      input,
    );

    if (!updatedShortenedUrl) {
      throw new NotFoundException('Url does not exists');
    }

    return new ShortenedUrl({
      ...updatedShortenedUrl,
      shortUrl: `${Env.APPLICATION_HOST}/${updatedShortenedUrl.shortUrl}`,
    });
  }
}
