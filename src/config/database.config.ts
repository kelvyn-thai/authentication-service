import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { registerAs } from '@nestjs/config';
import { defaultDataSourceConfig } from '@src/typeorm/typeorm-cli.config';

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
    ...defaultDataSourceConfig,
  } as MysqlConnectionOptions;
});
