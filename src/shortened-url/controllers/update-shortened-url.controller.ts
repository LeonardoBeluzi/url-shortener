import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Body,
  Req,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateShortenedUrlDto } from '../dto/update-shortened-url.dto';
import { UpdateShortenedUrlService } from '../services/update-shortened-url.service';
import { AuthGuard } from 'src/commons/guard/auth.guard';
import { ShowShortenedUrlDto } from '../dto/show-shortened-url.dto';

@ApiTags('Url Shortener')
@Controller()
export class UpdateShortenedUrlController {
  constructor(
    private readonly updateShortenedUrlService: UpdateShortenedUrlService,
  ) {}

  @Patch(':url')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ShowShortenedUrlDto })
  async get(
    @Req() request,
    @Param('url') url: string,
    @Body() body: UpdateShortenedUrlDto,
  ) {
    const shortenedUrl = await this.updateShortenedUrlService.execute(
      url,
      body,
      request.user.sub,
    );

    return new ShowShortenedUrlDto(shortenedUrl);
  }
}
