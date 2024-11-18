import * as dotenv from 'dotenv';

dotenv.config();

export abstract class Env {
  public static readonly NODE_ENV: string = process.env.NODE_ENV;

  public static readonly APPLICATION_VERSION: string =
    process.env.APPLICATION_VERSION;
  public static readonly APPLICATION_PORT: string =
    process.env.APPLICATION_PORT;
  public static readonly APPLICATION_HOST: string =
    process.env.APPLICATION_HOST;

  public static readonly SWAGGER_TITLE: string = process.env.SWAGGER_TITLE;
  public static readonly SWAGGER_DESCRIPTION: string =
    process.env.SWAGGER_DESCRIPTION;
  public static readonly SWAGGER_PATH: string = process.env.SWAGGER_PATH;

  public static readonly DATABASE_HOST: string = process.env.DATABASE_HOST;
  public static readonly DATABASE_PORT: number = Number(
    process.env.DATABASE_PORT,
  );
  public static readonly DATABASE_USERNAME: string =
    process.env.DATABASE_USERNAME;
  public static readonly DATABASE_PASSWORD: string =
    process.env.DATABASE_PASSWORD;
  public static readonly DATABASE_NAME: string = process.env.DATABASE_NAME;

  public static readonly JWT_SECRET: string = process.env.JWT_SECRET;
}
