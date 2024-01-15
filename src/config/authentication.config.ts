import { registerAs } from '@nestjs/config';

export const AUTHENTICATION_NAMESPACE = 'authentication';

export default registerAs(AUTHENTICATION_NAMESPACE, () => ({
  mock: process.env.AUTH_SERVICE,
}));
