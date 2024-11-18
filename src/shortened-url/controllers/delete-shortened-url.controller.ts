import {
  Controller,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ShowShortenedUrlDto } from '../dto/show-shortened-url.dto';
import { AuthGuard } from '../../commons/guard/auth.guard';
import { DeleteShortenedUrlService } from '../services/delete-shortened-url.service';

@ApiTags('Url Shortener')
@Controller()
export class DeleteShortenedUrlController {
  constructor(
    private readonly deleteShortenedUrlService: DeleteShortenedUrlService,
  ) {}

  @Delete(':url')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: ShowShortenedUrlDto })
  async delete(@Req() request, @Param('url') url: string) {
    return await this.deleteShortenedUrlService.execute(url, request.user.sub);
  }
}
