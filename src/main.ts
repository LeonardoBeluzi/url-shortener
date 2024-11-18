import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Env } from './commons/environment/env';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle(Env.SWAGGER_TITLE)
    .setDescription(Env.SWAGGER_DESCRIPTION)
    .setVersion(Env.APPLICATION_VERSION)
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(Env.SWAGGER_PATH, app, documentFactory);

  const port = Env.APPLICATION_PORT;
  await app
    .listen(port)
    .then(() => Logger.log(`API listening on port ${port}`))
    .catch((error: any) => {
      Logger.error(error);
    });
}
bootstrap();
