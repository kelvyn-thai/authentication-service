import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { User } from '@src/users/entities/user.entity';
import path from 'path';

export const defaultConfig: MysqlConnectionOptions = {
  type: process.env.DATABASE_TYPE as 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false, // only 'true' on dev environment
  logging: true,
  timezone: 'Z',
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrations: [`${path.resolve(__dirname, '../migrations/*.js')}`],
  entities: [User],
};

export default new DataSource({
  ...defaultConfig,
});
