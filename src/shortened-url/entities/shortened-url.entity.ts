interface IShortenedUrl {
  id?: number;
  longUrl: string;
  shortUrl: string;
  hits?: number;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deleteAt?: Date;
}

export default class ShortenedUrl {
  readonly id: number;
  readonly longUrl: string;
  readonly shortUrl: string;
  readonly hits: number;
  readonly userId: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deleteAt: Date;

  constructor({
    id,
    longUrl,
    shortUrl,
    hits,
    userId,
    createdAt,
    updatedAt,
    deleteAt,
  }: IShortenedUrl) {
    this.id = id;
    this.longUrl = longUrl;
    this.shortUrl = shortUrl;
    this.userId = userId;
    this.hits = hits || 0;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deleteAt = deleteAt;
  }
}
