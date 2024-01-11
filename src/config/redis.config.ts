import { registerAs } from '@nestjs/config';

export const REDIS_NAMESPACE = 'redis';

export interface RedisENV {
  host: string;
  port: number;
}

export default registerAs(REDIS_NAMESPACE, () => {
  return {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  } as RedisENV;
});
