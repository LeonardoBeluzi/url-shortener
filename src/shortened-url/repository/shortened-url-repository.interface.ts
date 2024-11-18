import { CreateShortenedUrlDto } from '../dto/create-shortened-url.dto';
import ShortenedUrl from '../entities/shortened-url.entity';

export interface IShortenedUrlRepository {
  create(shortenedUrl: CreateShortenedUrlDto): Promise<ShortenedUrl>;
  findOneByUrl(url: string): Promise<ShortenedUrl | null>;
  updateHits(id: number): Promise<void>;
}
