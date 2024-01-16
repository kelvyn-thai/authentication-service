import { MigrationInterface, QueryRunner } from 'typeorm';

export class AllowUsernameNullUserTable1705391780940
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users MODIFY username VARCHAR(255) NULL COMMENT 'User name - use for login'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users MODIFY username VARCHAR(255)ULL COMMENT 'User name - use for login'`,
    );
  }
}
