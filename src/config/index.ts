import authenticationConfig from './authentication.config';
import databaseConfig from './database.config';
import jwtConfig from './jwt.config';
import redisConfig from './redis.config';

export const appConfigs = [
  databaseConfig,
  jwtConfig,
  redisConfig,
  authenticationConfig,
];
