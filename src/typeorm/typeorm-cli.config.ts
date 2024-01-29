import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { User } from '@src/users/entities/user.entity';

export const defaultDataSourceConfig: MysqlConnectionOptions = {
  type: process.env.DATABASE_TYPE as 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false, // only 'true' on dev environment
  logging: true,
  timezone: 'Z',
  migrationsRun: false,
  migrationsTableName: 'migrations',
  entities: [User],
  migrations: [],
};

export default new DataSource({
  ...defaultDataSourceConfig,
});
