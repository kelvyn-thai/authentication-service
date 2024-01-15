/**
 * Represents a set of refresh tokens.
 *
 * @interface IGenerateTokens
 * @property {string} accessToken - The access token.
 * @property {string} refreshToken - The refresh token.
 */

export interface IGenerateTokens {
  accessToken: string;
  refreshToken: string;
}
