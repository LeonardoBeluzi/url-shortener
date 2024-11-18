import { Module } from '@nestjs/common';
import { databaseConfigurationOptions } from './commons/database/database.config';
import { UrlShortenerModule } from './shortened-url/url-shortener.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...databaseConfigurationOptions }),
    UrlShortenerModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
