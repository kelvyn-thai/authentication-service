import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DATABASE_BASE_NAMESPACE = 'database';

export interface DatabaseENV {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging: string;
}

export default registerAs(DATABASE_BASE_NAMESPACE, () => {
  return {
    type: process.env.DATABASE_TYPE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    autoLoadEntities: true,
    synchronize: false, // only 'true' on dev environment
    retryAttempts: 10,
    retryDelay: 3600,
    timezone: 'Z',
    keepConnectionAlive: true,
    logging: process.env.MYSQL_LOGGING === 'true',
  } as TypeOrmModuleOptions;
});
