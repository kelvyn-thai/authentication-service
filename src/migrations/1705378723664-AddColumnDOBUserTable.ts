import { MigrationInterface, QueryRunner } from 'typeorm';
export class AddColumnDOBUserTable1705378723664 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users ADD column date_of_birth TIMESTAMP NULL COMMENT 'User date of birth'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users DROP COLUMN date_of_birth`);
  }
}
