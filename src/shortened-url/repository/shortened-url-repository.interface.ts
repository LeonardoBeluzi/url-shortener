import { CreateShortenedUrlDto } from '../dto/create-shortened-url.dto';
import { UpdateShortenedUrlDto } from '../dto/update-shortened-url.dto';
import ShortenedUrl from '../entities/shortened-url.entity';

export interface IShortenedUrlRepository {
  create(shortenedUrl: CreateShortenedUrlDto): Promise<ShortenedUrl>;
  findOneByUrl(url: string): Promise<ShortenedUrl | null>;
  updateHits(id: number): Promise<void>;
  delete(shortUrl: string, userId: number): Promise<void>;
  update(
    shortUrl: string,
    userId: number,
    shortenedUrl: UpdateShortenedUrlDto,
  ): Promise<ShortenedUrl | null>;
  list(userId: number): Promise<ShortenedUrl[]>;
}
