import { IShortenedUrlRepository } from './shortened-url-repository.interface';
import ShortenedUrl from '../entities/shortened-url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from '../models/shortened-url.model';
import { UpdateShortenedUrlDto } from '../dto/update-shortened-url.dto';
import { IsNull, Repository } from 'typeorm';

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
        deletedAt: IsNull(),
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
        deletedAt: IsNull(),
      },
      'hits',
      1,
    );
  }

  async delete(shortUrl: string, userId: number): Promise<void> {
    await this.urlRepository.softDelete({
      shortUrl,
      deletedAt: IsNull(),
      user: {
        id: userId,
      },
    });
  }

  async update(
    shortUrl: string,
    userId: number,
    shortenedUrl: UpdateShortenedUrlDto,
  ): Promise<ShortenedUrl | null> {
    const foundUrl = await this.urlRepository.findOne({
      where: {
        shortUrl,
        deletedAt: IsNull(),
        user: { id: userId },
      },
    });

    if (!foundUrl) {
      return null;
    }

    const shortenedUrlEntity = this.urlRepository.create({
      ...foundUrl,
      longUrl: shortenedUrl.longUrl,
    });

    const updatedShortenedUrl =
      await this.urlRepository.save(shortenedUrlEntity);

    return new ShortenedUrl({
      ...updatedShortenedUrl,
    });
  }

  async list(userId: number): Promise<ShortenedUrl[]> {
    const foundUrls = await this.urlRepository.find({
      where: {
        deletedAt: IsNull(),
        user: {
          id: userId,
        },
      },
    });

    return foundUrls.map((foundUrl) => new ShortenedUrl(foundUrl));
  }
}
