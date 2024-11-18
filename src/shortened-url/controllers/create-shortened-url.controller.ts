import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateShortenedUrlDto } from '../dto/create-shortened-url.dto';
import { CreateShortenedUrlService } from '../services/create-shortened-url.service';
import { ShowShortenedUrlDto } from '../dto/show-shortened-url.dto';
import { AuthGuard } from '../../commons/guard/auth.guard';
import { Public } from '../../commons/decorator/public.decorator';

@ApiTags('Url Shortener')
@Controller('shorten-url')
export class CreateShortenedUrlController {
  constructor(
    private readonly createShortenedUrlService: CreateShortenedUrlService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Public()
  @ApiOkResponse({ type: ShowShortenedUrlDto })
  async create(
    @Req() request,
    @Body() createShortenedUrlDto: CreateShortenedUrlDto,
  ) {
    const userId = request.user ? request.user.sub : null;
    const shortenedUrl = await this.createShortenedUrlService.execute(
      createShortenedUrlDto,
      userId,
    );

    return new ShowShortenedUrlDto(shortenedUrl);
  }
}
