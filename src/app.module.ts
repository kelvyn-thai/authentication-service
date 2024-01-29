import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { HeaderResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { appConfigs } from '@src/config';
import path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { CaslModule } from './casl/casl.module';
import { DATABASE_BASE_NAMESPACE } from './config/database.config';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: appConfigs,
    }),
    AuthenticationModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const databaseConfig = configService.get(DATABASE_BASE_NAMESPACE);
        if (!databaseConfig) {
          throw new Error('Can not get database configuration!');
        }
        return {
          ...databaseConfig,
          keepAlive: true,
          retryDelay: 3600,
          keepConnectionAlive: true,
          retryAttempts: 3,
          autoLoadEntities: true,
        } as TypeOrmModuleOptions;
      },
      imports: [ConfigModule],
      inject: [ConfigService],
      dataSourceFactory: async (options: DataSourceOptions) => {
        try {
          const dataSource: DataSource = await new DataSource(
            options,
          ).initialize();
          return dataSource;
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'en-*': 'en',
        'vi-*': 'vi',
      },
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        new QueryResolver(['lang', 'language']),
        new HeaderResolver(['lang', 'language']),
      ],
      typesOutputPath: path.join(
        __dirname,
        '../src/generated/i18n.generated.ts',
      ),
    }),
    CaslModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
