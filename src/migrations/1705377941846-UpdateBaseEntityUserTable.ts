import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBaseEntityColumn1705377941846 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.query(
        `ALTER TABLE users CHANGE createdAt created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time created user';`,
      ),
      queryRunner.query(
        `ALTER TABLE users CHANGE updatedAt updated_at TIMESTAMP NULL COMMENT 'Time updated user';`,
      ),
      queryRunner.query(
        `ALTER TABLE users CHANGE deletedAt deleted_at TIMESTAMP NULL COMMENT 'Time deleted user';`,
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.query(
        `ALTER TABLE users CHANGE created_at createdAt  TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Time created user';`,
      ),
      queryRunner.query(
        `ALTER TABLE users CHANGE updated_at updatedAt TIMESTAMP NULL COMMENT 'Time updated user';`,
      ),
      queryRunner.query(
        ` ALTER TABLE users CHANGE deleted_at deletedAt TIMESTAMP NULL COMMENT 'Time deleted user';`,
      ),
    ]);
  }
}
