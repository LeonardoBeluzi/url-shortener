import { Module } from '@nestjs/common';
import { databaseConfigurationOptions } from './commons/database/database.config';
import { UrlShortenerModule } from './shortened-url/url-shortener.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...databaseConfigurationOptions }),
    UrlShortenerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
