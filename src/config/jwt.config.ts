import { registerAs } from '@nestjs/config';

const ONE_HOUR_TO_SECONDS = '3600';
const ONE_DAY = '86400';

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET,
    audience: process.env.JWT_TOKEN_AUDIENCE,
    issuer: process.env.JWT_TOKEN_ISSUER,
    accessTokenTtl: parseInt(
      process.env.JWT_ACCESS_TOKEN_TTL ?? ONE_HOUR_TO_SECONDS,
      10,
    ),
    refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? ONE_DAY, 10),
  };
});
