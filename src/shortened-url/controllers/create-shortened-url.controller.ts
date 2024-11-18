import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateShortenedUrlDto } from '../dto/create-shortened-url.dto';
import { CreateShortenedUrlService } from '../services/create-shortened-url.service';
import { ShowShortenedUrlDto } from '../dto/show-shortened-url.dto';

@ApiTags('Url Shortener')
@Controller('shorten-url')
export class CreateShortenedUrlController {
  constructor(
    private readonly createShortenedUrlService: CreateShortenedUrlService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ShowShortenedUrlDto })
  async create(@Body() createShortenedUrlDto: CreateShortenedUrlDto) {
    const shortenedUrl = await this.createShortenedUrlService.execute(
      createShortenedUrlDto,
    );

    return new ShowShortenedUrlDto(shortenedUrl);
  }
}
