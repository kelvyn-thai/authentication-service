import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { User } from '@src/users/entities/user.entity';
import { AddColumnPermissionToUserTable1706585012992 } from '@src/migrations/1706585012992-AddColumnPermissionToUserTable';
import { AddColumnRoleToUserTable1705288490321 } from '@src/migrations/1705288490321-AddColumnRoleToUserTable';
import { CreateApiKeyTable1707882698910 } from '@src/migrations/1707882698910-CreateApiKeyTable';
import { ApiKey } from '@src/api-key/entities/api-key.entity';

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
  entities: [User, ApiKey],
  migrations: [
    AddColumnPermissionToUserTable1706585012992,
    AddColumnRoleToUserTable1705288490321,
    CreateApiKeyTable1707882698910,
  ],
};

export default new DataSource({
  ...defaultDataSourceConfig,
});
