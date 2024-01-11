// import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import path from 'path';
import { DATA_SOURCE } from '@src/constants/database.constants';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { User } from '@src/users/entities/user.entity';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () =>
      // configService: ConfigService
      {
        try {
          console.log(process.env);
          const dataSource = new DataSource({
            type: process.env.DATABASE_TYPE as 'mysql',
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            username: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            // entities: [path.resolve(__dirname + '/../**/*.entity{.ts,.js}')],
            synchronize: false,
            entities: [User],
          } as MysqlConnectionOptions);
          await dataSource.initialize();
          console.info('Data Source has been initialied!');
        } catch (error) {
          throw new Error(`Error during Data Source initialization ${error}`);
        }
      },
    // inject: [ConfigService],
  },
];
