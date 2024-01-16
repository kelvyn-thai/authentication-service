import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { AddColumnRoleToUserTable1705288490321 } from '@src/migrations/1705288490321-AddColumnRoleToUserTable';
import { User } from '@src/users/entities/user.entity';
import { AddColumnDOBUserTable1705378723664 } from '@src/migrations/1705378723664-AddColumnDOBUserTable';
import { AllowUsernameNullUserTable1705391780940 } from '@src/migrations/1705391780940-AllowUsernameNullUserTable';

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
  migrations: [
    AddColumnRoleToUserTable1705288490321,
    AddColumnDOBUserTable1705378723664,
    AllowUsernameNullUserTable1705391780940,
  ],
};

export default new DataSource({
  ...defaultDataSourceConfig,
});
