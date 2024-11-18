import {
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Res,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindShortenedUrlService } from '../services/find-shortened-url.service';
import { Response } from 'express';

@ApiTags('Url Shortener')
@Controller()
export class FindShortenedUrlController {
  constructor(
    private readonly findShortenedUrlService: FindShortenedUrlService,
  ) {}

  @Get(':url')
  @HttpCode(HttpStatus.FOUND)
  async get(@Res() response: Response, @Param('url') url: string) {
    const shortenedUrl = await this.findShortenedUrlService.execute(url);
    return response.redirect(302, shortenedUrl.longUrl);
  }
}
