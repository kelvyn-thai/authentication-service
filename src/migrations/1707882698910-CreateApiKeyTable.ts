import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateApiKeyTable1707882698910 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
CREATE TABLE IF NOT EXISTS apikeys (
  id CHAR(36) NOT NULL UNIQUE COMMENT 'Api Key ID', -- Assuming usage of UUIDs
  apiKey VARCHAR(255) NOT NULL COMMENT 'Api Key',
  hashedKey VARCHAR(255) NOT NULL COMMENT 'Api Key Hashed',
  userID CHAR(36) NOT NULL COMMENT 'User ID', -- Foreign key to users table
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time created Api Key',
  updatedAt TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP COMMENT 'Time updated Api Key', -- Automatically updates
  deletedAt TIMESTAMP NULL COMMENT 'Time deleted Api Key',
  PRIMARY KEY (id),
  CONSTRAINT fk_apikeys_users FOREIGN KEY (userID) REFERENCES users(id) -- Ensures referential integrity
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE apikeys`);
  }
}
