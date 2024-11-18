import {
  Controller,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../commons/guard/auth.guard';
import { ListShortenedUrlService } from '../services/list-shortened-url.service';
import { ListShortenedUrlDto } from '../dto/list-shortened-url.dto';

@ApiTags('Url Shortener')
@Controller()
export class ListShortenedUrlController {
  constructor(
    private readonly listShortenedUrlService: ListShortenedUrlService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [ListShortenedUrlDto] })
  async list(@Req() request) {
    const shortenedUrls = await this.listShortenedUrlService.execute(
      request.user.sub,
    );

    return shortenedUrls.map(
      (shortenedUrl) => new ListShortenedUrlDto(shortenedUrl),
    );
  }
}
