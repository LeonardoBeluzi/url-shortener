import { IShortenedUrlRepository } from './shortened-url-repository.interface';
import ShortenedUrl from '../entities/shortened-url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from '../models/shortened-url.model';
import { Repository } from 'typeorm';

export class ShortenedUrlRepository implements IShortenedUrlRepository {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
  ) {}

  async create(shortenedUrl: ShortenedUrl): Promise<ShortenedUrl> {
    const shortenedUrlEntity = this.urlRepository.create({
      ...shortenedUrl,
      user: { id: shortenedUrl.userId },
    });

    const createdShortenedUrl =
      await this.urlRepository.save(shortenedUrlEntity);

    return new ShortenedUrl({
      ...createdShortenedUrl,
      userId: createdShortenedUrl.user.id,
    });
  }

  async findOneByUrl(url: string): Promise<ShortenedUrl | null> {
    const foundUrl = await this.urlRepository.findOne({
      where: {
        shortUrl: url,
      },
    });

    if (!foundUrl) {
      return null;
    }

    return new ShortenedUrl(foundUrl);
  }

  async updateHits(id: number): Promise<void> {
    await this.urlRepository.increment(
      {
        id,
      },
      'hits',
      1,
    );
  }
}
